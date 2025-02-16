import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra;

export const config = {
  firebase: {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
  app: {
    name: process.env.EXPO_PUBLIC_APP_NAME,
    description: process.env.EXPO_PUBLIC_APP_DESCRIPTION,
    version: process.env.EXPO_PUBLIC_APP_VERSION,
  },
  features: {
    enableAnalytics: true,
    enableCrashReporting: true,
    enablePerformanceMonitoring: true,
  },
  theme: {
    defaultMode: 'dark' as const,
  },
} as const;

export type Config = typeof config;