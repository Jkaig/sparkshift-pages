// File: app/review/page.tsx

'use client';
export const dynamic = 'force-dynamic';

import React, { useEffect, Suspense } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Platform } from 'react-native';
import * as Linking from 'expo-linking';

function ReviewContent() {
  const params = useLocalSearchParams();
  const evaluationId = params.evaluationId as string;

  const openApp = async () => {
    const url = `sparkshift://review?evaluationId=${evaluationId}`;
    const canOpen = await Linking.canOpenURL(url);
    
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      // If can't open, fallback to store URLs
      if (Platform.OS === 'ios') {
        await Linking.openURL('https://apps.apple.com/app/sparkshift/id123456789');
      } else if (Platform.OS === 'android') {
        await Linking.openURL('https://play.google.com/store/apps/details?id=com.jeremykaigler.sparkshiftapp');
      }
    }
  };

  useEffect(() => {
    if (evaluationId) {
      openApp();
    }
  }, [evaluationId]);

  return (
    <View style={styles.container}>
      {evaluationId ? (
        <>
          <Text style={styles.title}>Your review is ready!</Text>
          <Text style={styles.subtitle}>If the app does not open automatically, click the button below.</Text>
          <Text
            onPress={openApp}
            style={styles.button}
          >
            Open in Sparkshift App
          </Text>
        </>
      ) : (
        <Text style={styles.error}>Evaluation ID not found. Please check your link.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
    padding: 8,
  },
  error: {
    fontSize: 16,
    color: '#FF3B30',
  }
});

export default function ReviewPage() {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <ReviewContent />
    </Suspense>
  );
}