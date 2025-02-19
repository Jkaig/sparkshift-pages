import { UserReadiness, TestAnalytics, StateComparison, TestResult, CategoryScore } from '../types/analytics';
import { getFirestore, collection, query, where, getDocs, addDoc, orderBy, limit } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const WEIGHT_TIME = 0.4;
const WEIGHT_ACCURACY = 0.6;

export class TestAnalyticsService {
  private db = getFirestore();
  private auth = getAuth();

  async submitTestResult(result: Omit<TestResult, 'userId' | 'timestamp'>) {
    const userId = this.auth.currentUser?.uid;
    if (!userId) throw new Error('User not authenticated');

    const testResult: TestResult = {
      ...result,
      userId,
      timestamp: new Date()
    };

    await addDoc(collection(this.db, 'testResults'), testResult);
  }

  async calculateUserReadiness(userId: string): Promise<UserReadiness> {
    const results = await this.getUserTestResults(userId);
    
    const timeScores = results.map(r => this.calculateTimeScore(r.timeSpent));
    const accuracyScores = results.map(r => r.correctAnswers / r.questionsAttempted);
    
    const timeScore = this.average(timeScores);
    const accuracyScore = this.average(accuracyScores);
    const overallScore = (timeScore * WEIGHT_TIME) + (accuracyScore * WEIGHT_ACCURACY);

    const analytics = await this.calculateTestAnalytics(userId);
    
    return {
      timeScore,
      accuracyScore,
      overallScore,
      strengths: this.getStrengths(analytics),
      weaknesses: analytics.weakestAreas,
      timestamp: new Date()
    };
  }

  async calculateTestAnalytics(userId: string): Promise<TestAnalytics> {
    const results = await this.getUserTestResults(userId);
    const categoryScores: { [key: string]: CategoryScore } = {};

    results.forEach(result => {
      if (!categoryScores[result.categoryId]) {
        categoryScores[result.categoryId] = {
          score: 0,
          timeSpent: 0,
          questionsAttempted: 0,
          accuracy: 0,
          timestamp: new Date()
        };
      }

      const category = categoryScores[result.categoryId];
      category.score = (category.score + result.score) / 2;
      category.timeSpent = (category.timeSpent + result.timeSpent) / 2;
      category.questionsAttempted += result.questionsAttempted;
      category.accuracy = (category.accuracy + (result.correctAnswers / result.questionsAttempted)) / 2;
    });

    const weakestAreas = Object.entries(categoryScores)
      .sort(([, a], [, b]) => a.score - b.score)
      .slice(0, 3)
      .map(([category]) => category);

    return {
      categoryScores,
      weakestAreas,
      recommendedFocus: this.generateRecommendations(categoryScores),
      lastUpdated: new Date()
    };
  }

  async getStateComparison(userId: string, state: string): Promise<StateComparison> {
    const userResults = await this.getUserTestResults(userId);
    const userAverage = this.average(userResults.map(r => r.score));

    const stateResults = await this.getStateResults(state);
    const stateAverage = this.average(stateResults.map(r => r.score));
    
    const percentileRank = this.calculatePercentileRank(userAverage, stateResults.map(r => r.score));

    const similarUsers = await this.getSimilarUsersStats(userId, state);

    return {
      userScore: userAverage,
      stateAverage,
      percentileRank,
      similarUsers,
      region: state,
      lastUpdated: new Date()
    };
  }

  private async getUserTestResults(userId: string): Promise<TestResult[]> {
    const q = query(
      collection(this.db, 'testResults'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as TestResult);
  }

  private async getStateResults(state: string): Promise<TestResult[]> {
    const q = query(
      collection(this.db, 'testResults'),
      where('state', '==', state),
      orderBy('timestamp', 'desc'),
      limit(1000)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as TestResult);
  }

  private calculateTimeScore(timeSpent: number): number {
    // Implement your time scoring logic here
    const maxExpectedTime = 3600; // 1 hour
    return Math.max(0, 1 - (timeSpent / maxExpectedTime));
  }

  private average(numbers: number[]): number {
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
  }

  private calculatePercentileRank(score: number, allScores: number[]): number {
    const sorted = [...allScores].sort((a, b) => a - b);
    const index = sorted.findIndex(s => s >= score);
    return (index / sorted.length) * 100;
  }

  private async getSimilarUsersStats(userId: string, state: string) {
    const q = query(
      collection(this.db, 'testResults'),
      where('state', '==', state),
      orderBy('timestamp', 'desc'),
      limit(100)
    );

    const snapshot = await getDocs(q);
    const results = snapshot.docs.map(doc => doc.data() as TestResult);

    return {
      averageScore: this.average(results.map(r => r.score)),
      averageTime: this.average(results.map(r => r.timeSpent))
    };
  }

  private getStrengths(analytics: TestAnalytics): string[] {
    return Object.entries(analytics.categoryScores)
      .sort(([, a], [, b]) => b.score - a.score)
      .slice(0, 3)
      .map(([category]) => category);
  }

  private generateRecommendations(categoryScores: { [key: string]: CategoryScore }): string[] {
    return Object.entries(categoryScores)
      .sort(([, a], [, b]) => {
        const aScore = a.score * a.accuracy;
        const bScore = b.score * b.accuracy;
        return aScore - bScore;
      })
      .slice(0, 3)
      .map(([category]) => category);
  }
}
