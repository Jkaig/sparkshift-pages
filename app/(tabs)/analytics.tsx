import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TestAnalyticsDisplay } from '@/components/analytics/TestAnalyticsDisplay';

export default function AnalyticsScreen() {
  return (
    <View style={styles.container}>
      <TestAnalyticsDisplay />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
});