import { useEffect } from 'react';
import { View } from 'react-native';
import { Slot } from 'expo-router';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import * as Linking from 'expo-linking';
import { handleDeepLink } from './app/utils/deepLinking';

// Import and register the root component
import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'dummy-key',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'dummy-domain',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'dummy-project',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'dummy-bucket',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'dummy-sender',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || 'dummy-app-id',
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || 'dummy-measurement'
};

// Initialize Firebase only if configuration is valid
let app, auth, db, analytics;
try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.warn('Firebase initialization failed:', error.message);
}

export { auth, db, analytics };

export default function App() {
  useEffect(() => {
    // Handle deep links when the app is not running
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Handle deep links when the app is already running
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <Slot />
    </View>
  );
}

registerRootComponent(App);
