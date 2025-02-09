import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { app } from './firebase';

export default function RootLayout() {
  useEffect(() => {
    if (app) {
      console.log('Firebase initialized');
    }
  }, []);

  return <Stack />;
}
