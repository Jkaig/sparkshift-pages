import { getAnalytics, logEvent, Analytics } from 'firebase/analytics';
import app from './firebase';

let analytics: Analytics | null = null;

export const initAnalytics = async () => {
  try {
    analytics = await getAnalytics(app);
    return true;
  } catch (error) {
    console.error('Failed to initialize analytics:', error);
    return false;
  }
};

export const logAnalyticsEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
  }
};

export interface PerformanceMetrics {
  overallScore: number;
  timeMetrics: {
    averageTimePerQuestion: number;
    timeManagementScore: number;
  };
  topicBreakdown: {
    [topic: string]: {
      score: number;
      improvement: number;
      comparisonToAverage: number;
    };
  };
  weakAreas: string[];
  strongAreas: string[];
  trendAnalysis: {
    weeklyProgress: number;
    consistencyScore: number;
  };
}

export const trackUserPerformance = (metrics: PerformanceMetrics) => {
  logAnalyticsEvent('user_performance', {
    overall_score: metrics.overallScore,
    avg_time_per_question: metrics.timeMetrics.averageTimePerQuestion,
    time_management_score: metrics.timeMetrics.timeManagementScore,
    weak_areas: metrics.weakAreas.join(','),
    strong_areas: metrics.strongAreas.join(','),
    weekly_progress: metrics.trendAnalysis.weeklyProgress,
    consistency_score: metrics.trendAnalysis.consistencyScore,
  });
};

export const trackScreenView = (screenName: string) => {
  logAnalyticsEvent('screen_view', {
    screen_name: screenName,
    app_version: process.env.EXPO_PUBLIC_APP_VERSION,
  });
};

export const trackUserAction = (action: string, params?: Record<string, any>) => {
  logAnalyticsEvent('user_action', {
    action,
    ...params,
  });
};