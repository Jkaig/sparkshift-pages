import { db } from './firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, orderBy, limit } from 'firebase/firestore';

export interface PerformanceMetrics {
  userId: string;
  state: string;
  overallScore: number;
  timeMetrics: {
    averageTimePerQuestion: number;
    timeManagementScore: number;
    nationalAverageTime: number;
    timePercentile: number;
  };
  topicBreakdown: {
    [topic: string]: {
      score: number;
      improvement: number;
      nationalAverage: number;
      percentile: number;
    };
  };
  weakAreas: string[];
  strongAreas: string[];
  trendAnalysis: {
    weeklyProgress: number;
    consistencyScore: number;
    streak: number;
  };
  achievements: Achievement[];
  rank: {
    state: number;
    national: number;
    totalUsers: number;
  };
  lastUpdated: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress?: number;
  requiredProgress?: number;
}

const achievements: Achievement[] = [
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Complete a test 30% faster than the national average while maintaining 80%+ accuracy',
    icon: '⚡',
  },
  {
    id: 'perfect_score',
    title: 'Perfect Score',
    description: 'Achieve 100% on a practice test',
    icon: '🎯',
  },
  {
    id: 'consistent_learner',
    title: 'Consistent Learner',
    description: 'Complete practice tests for 7 consecutive days',
    icon: '📚',
  },
  {
    id: 'topic_master',
    title: 'Topic Master',
    description: 'Achieve 90%+ in any topic area',
    icon: '🏆',
  },
  // Add more achievements as needed
];

export const calculateNationalAverages = async (state: string): Promise<{
  averageTime: number;
  topicAverages: { [topic: string]: number };
}> => {
  const answersRef = collection(db, 'userAnswers');
  const stateQuery = query(
    answersRef,
    where('state', '==', state),
    orderBy('attemptedAt', 'desc'),
    limit(1000)
  );

  const snapshot = await getDocs(stateQuery);
  const answers = snapshot.docs.map(doc => doc.data());

  const timeSum = answers.reduce((sum, answer) => sum + answer.timeSpent, 0);
  const averageTime = timeSum / answers.length;

  const topicAverages = answers.reduce((acc, answer) => {
    const topic = answer.topic;
    if (!acc[topic]) {
      acc[topic] = { sum: 0, count: 0 };
    }
    acc[topic].sum += answer.isCorrect ? 1 : 0;
    acc[topic].count += 1;
    return acc;
  }, {});

  return {
    averageTime,
    topicAverages: Object.entries(topicAverages).reduce((acc, [topic, data]) => {
      acc[topic] = (data.sum / data.count) * 100;
      return acc;
    }, {}),
  };
};

export const updateUserPerformance = async (
  userId: string,
  testResults: any,
  state: string
): Promise<PerformanceMetrics> => {
  const nationalAverages = await calculateNationalAverages(state);
  
  // Calculate user's metrics
  const timePerQuestion = testResults.totalTime / testResults.questions.length;
  const timePercentile = await calculatePercentile('timePerQuestion', timePerQuestion, state);
  
  // Calculate topic breakdown
  const topicBreakdown = {};
  for (const [topic, results] of Object.entries(testResults.topicResults)) {
    const percentile = await calculatePercentile('topicScore', results.score, state);
    topicBreakdown[topic] = {
      score: results.score,
      improvement: results.improvement,
      nationalAverage: nationalAverages.topicAverages[topic],
      percentile,
    };
  }

  // Calculate ranks
  const ranks = await calculateUserRanks(userId, state);

  // Check for achievements
  const userAchievements = await processAchievements(userId, testResults);

  const metrics: PerformanceMetrics = {
    userId,
    state,
    overallScore: testResults.overallScore,
    timeMetrics: {
      averageTimePerQuestion: timePerQuestion,
      timeManagementScore: calculateTimeManagementScore(timePerQuestion, nationalAverages.averageTime),
      nationalAverageTime: nationalAverages.averageTime,
      timePercentile,
    },
    topicBreakdown,
    weakAreas: testResults.weakAreas,
    strongAreas: testResults.strongAreas,
    trendAnalysis: {
      weeklyProgress: testResults.weeklyProgress,
      consistencyScore: testResults.consistencyScore,
      streak: testResults.streak,
    },
    achievements: userAchievements,
    rank: ranks,
    lastUpdated: new Date(),
  };

  // Store metrics in Firestore
  const metricsRef = collection(db, 'userMetrics');
  await addDoc(metricsRef, metrics);

  return metrics;
};

const calculatePercentile = async (
  metric: string,
  value: number,
  state: string
): Promise<number> => {
  const metricsRef = collection(db, 'userMetrics');
  const stateQuery = query(metricsRef, where('state', '==', state));
  const snapshot = await getDocs(stateQuery);
  
  const values = snapshot.docs.map(doc => doc.data()[metric]).sort((a, b) => a - b);
  const index = values.findIndex(v => v >= value);
  return (index / values.length) * 100;
};

const calculateTimeManagementScore = (
  userTime: number,
  averageTime: number
): number => {
  const ratio = averageTime / userTime;
  return Math.min(Math.max(ratio * 100, 0), 100);
};

const calculateUserRanks = async (
  userId: string,
  state: string
): Promise<{ state: number; national: number; totalUsers: number }> => {
  const metricsRef = collection(db, 'userMetrics');
  
  // Get state rank
  const stateQuery = query(
    metricsRef,
    where('state', '==', state),
    orderBy('overallScore', 'desc')
  );
  const stateSnapshot = await getDocs(stateQuery);
  const stateRank = stateSnapshot.docs.findIndex(doc => doc.data().userId === userId) + 1;
  
  // Get national rank
  const nationalQuery = query(metricsRef, orderBy('overallScore', 'desc'));
  const nationalSnapshot = await getDocs(nationalQuery);
  const nationalRank = nationalSnapshot.docs.findIndex(doc => doc.data().userId === userId) + 1;
  
  return {
    state: stateRank,
    national: nationalRank,
    totalUsers: nationalSnapshot.size,
  };
};

const processAchievements = async (
  userId: string,
  testResults: any
): Promise<Achievement[]> => {
  const userAchievements = [...achievements];
  
  // Check each achievement condition
  for (const achievement of userAchievements) {
    switch (achievement.id) {
      case 'speed_demon':
        if (testResults.overallScore >= 80 && 
            testResults.averageTimePerQuestion <= testResults.nationalAverageTime * 0.7) {
          achievement.unlockedAt = new Date();
        }
        break;
      case 'perfect_score':
        if (testResults.overallScore === 100) {
          achievement.unlockedAt = new Date();
        }
        break;
      case 'consistent_learner':
        if (testResults.streak >= 7) {
          achievement.unlockedAt = new Date();
        }
        achievement.progress = testResults.streak;
        achievement.requiredProgress = 7;
        break;
      case 'topic_master':
        const topicScores = Object.values(testResults.topicResults);
        if (topicScores.some(score => score >= 90)) {
          achievement.unlockedAt = new Date();
        }
        break;
    }
  }

  // Store updated achievements
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    achievements: userAchievements,
  });

  return userAchievements;
};

export const getLeaderboard = async (
  state?: string,
  limit: number = 100
): Promise<any[]> => {
  const metricsRef = collection(db, 'userMetrics');
  const leaderboardQuery = state
    ? query(
        metricsRef,
        where('state', '==', state),
        orderBy('overallScore', 'desc'),
        limit(limit)
      )
    : query(
        metricsRef,
        orderBy('overallScore', 'desc'),
        limit(limit)
      );

  const snapshot = await getDocs(leaderboardQuery);
  return snapshot.docs.map(doc => ({
    userId: doc.data().userId,
    score: doc.data().overallScore,
    rank: doc.data().rank,
    achievements: doc.data().achievements,
  }));
};