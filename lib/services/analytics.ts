import { Analytics, getAnalytics, logEvent, AnalyticsCallOptions } from 'firebase/analytics';
import { initializeApp, getApps } from 'firebase/app';

let analytics: Analytics | null = null;

export const initializeAnalytics = async () => {
  if (typeof window !== 'undefined') {
    const firebaseConfig = {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
    };
    
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    analytics = getAnalytics(app);
  }
};

type CustomEvent = 
  | 'screen_view'
  | 'error'
  | 'user_action'
  | string;

export const trackEvent = (eventName: CustomEvent, params?: { [key: string]: any }, options?: AnalyticsCallOptions) => {
  if (analytics) {
    logEvent(analytics, eventName, params, options);
  }
};

export const trackScreen = (screenName: string, params?: Record<string, any>) => {
  if (analytics) {
    trackEvent('screen_view', {
      screen_name: screenName,
      ...params,
    });
  }
};

export const trackUserAction = (action: string, params?: Record<string, any>) => {
  if (analytics) {
    trackEvent('user_action', {
      action_type: action,
      timestamp: new Date().toISOString(),
      ...params,
    });
  }
};

export const trackError = (error: Error, context?: string) => {
  if (analytics) {
    trackEvent('error', {
      error_name: error.name,
      error_message: error.message,
      error_stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    });
  }
};