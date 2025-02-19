import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, getDoc, doc } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import Constants from 'expo-constants';

// Validate required environment variables
const requiredEnvVars = [
  'EXPO_PUBLIC_FIREBASE_API_KEY',
  'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
] as const;

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.warn(`Missing required environment variable: ${varName}`);
  }
});

// Use development configuration if environment variables are not set
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'development-api-key',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'sparkshift-dev.firebaseapp.com',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'sparkshift-dev',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'sparkshift-dev.appspot.com',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '1:000000000000:web:0000000000000000000000',
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-0000000000'
};

import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

// Initialize Firebase only in browser environment
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

if (typeof window !== 'undefined') {
  try {
    console.log('Initializing Firebase with config:', {
      ...firebaseConfig,
      apiKey: firebaseConfig.apiKey ? '***' : undefined
    });
    
    if (getApps().length === 0) {
      console.log('No existing Firebase app, initializing new one');
      app = initializeApp(firebaseConfig);
    } else {
      console.log('Firebase app already exists, getting existing one');
      app = getApp();
    }
    
    if (app) {
      console.log('Initializing Firebase Auth');
      auth = getAuth(app);
      
      console.log('Initializing Firestore');
      db = getFirestore(app);
      
      console.log('Firebase initialization complete');
    }
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
}

export { app, auth, db };

// Initialize Analytics conditionally
export const initializeAnalytics = async () => {
  if (typeof window !== 'undefined' && await isSupported() && app) {
    return getAnalytics(app);
  }
  return null;
};

// Development environment setup
if (__DEV__) {
  // Connect to Firebase emulators in development
  if (process.env.EXPO_PUBLIC_USE_FIREBASE_EMULATOR === 'true' && auth && db) {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
  }
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  sparkshiftMobileVerified?: boolean;
  sparkshiftMobileSubscriptionId?: string;
  subscriptionStatus?: 'active' | 'inactive' | 'trial';
  subscriptionTier?: 'free' | 'pro' | 'enterprise';
  subscriptionEndDate?: Date;
  discountEligible?: boolean;
  discountAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  if (!db) return null;
  
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export default app;