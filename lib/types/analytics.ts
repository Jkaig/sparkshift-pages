export interface UserReadiness {
  timeScore: number;
  accuracyScore: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  timestamp: Date;
}

export interface CategoryScore {
  score: number;
  timeSpent: number;
  questionsAttempted: number;
  accuracy: number;
  timestamp: Date;
}

export interface TestAnalytics {
  categoryScores: {
    [category: string]: CategoryScore;
  };
  weakestAreas: string[];
  recommendedFocus: string[];
  lastUpdated: Date;
}

export interface StateComparison {
  userScore: number;
  stateAverage: number;
  percentileRank: number;
  similarUsers: {
    averageScore: number;
    averageTime: number;
  };
  region: string;
  lastUpdated: Date;
}

export interface TestResult {
  userId: string;
  categoryId: string;
  score: number;
  timeSpent: number;
  questionsAttempted: number;
  correctAnswers: number;
  timestamp: Date;
}
