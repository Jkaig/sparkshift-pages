import { Stack } from 'expo-router';
import { ErrorBoundary } from '../lib/services/error-boundary';
import { useEffect } from 'react';
import { initializeMonitoring } from '../lib/services/monitoring';
import { initializeAnalytics } from '../lib/services/analytics';

export default function RootLayout() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      initializeMonitoring();
      initializeAnalytics();
    }
  }, []);

  return (
    <ErrorBoundary>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ErrorBoundary>
  );
}