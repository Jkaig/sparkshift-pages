// File: app/review/page.tsx

'use client';
export const dynamic = 'force-dynamic';

import { useEffect, Suspense } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

function ReviewContent() {
  const params = useLocalSearchParams();
  const evaluationId = params.get('evaluationId');

  useEffect(() => {
    if (evaluationId) {
      // Attempt to open the app using a custom URI scheme
      window.location.href = `sparkshift://review?evaluationId=${evaluationId}`;
    }
  }, [evaluationId]);

  return (
    <View style={{ padding: 32, textAlign: 'center' }}>
      {evaluationId ? (
        <>
          <Text>Your review is ready!</Text>
          <Text>If the app does not open automatically, click the button below.</Text>
          <Text
            onPress={() =>
              (window.location.href = `sparkshift://review?evaluationId=${evaluationId}`)
            }
            style={{ padding: 8, fontSize: 16, textDecorationLine: 'underline' }}
          >
            Open in Sparkshift App
          </Text>
        </>
      ) : (
        <Text>Evaluation ID not found. Please check your link.</Text>
      )}
    </View>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <ReviewContent />
    </Suspense>
  );
}