import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
import { TestAnalyticsService } from '@/lib/services/test-analytics';
import { UserReadiness, TestAnalytics, StateComparison } from '@/lib/types/analytics';
import { getAuth } from 'firebase/auth';
import { format } from 'date-fns';
import Animated, { FadeInUp } from 'react-native-reanimated';

const analyticsService = new TestAnalyticsService();

export function TestAnalyticsDisplay() {
  const [readiness, setReadiness] = useState<UserReadiness | null>(null);
  const [analytics, setAnalytics] = useState<TestAnalytics | null>(null);
  const [stateComparison, setStateComparison] = useState<StateComparison | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      setLoading(true);
      const auth = getAuth();
      const userId = auth.currentUser?.uid;
      
      if (!userId) {
        setError('User not authenticated');
        return;
      }

      const [readinessData, analyticsData, comparisonData] = await Promise.all([
        analyticsService.calculateUserReadiness(userId),
        analyticsService.calculateTestAnalytics(userId),
        analyticsService.getStateComparison(userId, 'YOUR_STATE') // Replace with actual state
      ]);

      setReadiness(readinessData);
      setAnalytics(analyticsData);
      setStateComparison(comparisonData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading analytics...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {readiness && (
        <Animated.View entering={FadeInUp.delay(100)}>
          <Card>
            <CardContent>
              <Text style={styles.sectionTitle}>Overall Readiness</Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>{Math.round(readiness.overallScore * 100)}%</Text>
                <Text style={styles.scoreLabel}>Overall Score</Text>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Time Efficiency</Text>
                  <Text style={styles.statValue}>{Math.round(readiness.timeScore * 100)}%</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Accuracy</Text>
                  <Text style={styles.statValue}>{Math.round(readiness.accuracyScore * 100)}%</Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </Animated.View>
      )}

      {analytics && (
        <Animated.View entering={FadeInUp.delay(200)}>
          <Card style={styles.card}>
            <CardContent>
              <Text style={styles.sectionTitle}>Areas of Focus</Text>
              <View style={styles.focusContainer}>
                <View style={styles.focusSection}>
                  <Text style={styles.focusTitle}>Strengths</Text>
                  {analytics.categoryScores && analytics.weakestAreas.map((area, index) => (
                    <Text key={index} style={styles.focusItem}>{area}</Text>
                  ))}
                </View>
                <View style={styles.focusSection}>
                  <Text style={styles.focusTitle}>Needs Improvement</Text>
                  {analytics.weakestAreas.map((area, index) => (
                    <Text key={index} style={styles.focusItem}>{area}</Text>
                  ))}
                </View>
              </View>
            </CardContent>
          </Card>
        </Animated.View>
      )}

      {stateComparison && (
        <Animated.View entering={FadeInUp.delay(300)}>
          <Card style={styles.card}>
            <CardContent>
              <Text style={styles.sectionTitle}>State Comparison</Text>
              <View style={styles.comparisonContainer}>
                <View style={styles.comparisonItem}>
                  <Text style={styles.comparisonLabel}>Your Score</Text>
                  <Text style={styles.comparisonValue}>{Math.round(stateComparison.userScore)}%</Text>
                </View>
                <View style={styles.comparisonItem}>
                  <Text style={styles.comparisonLabel}>State Average</Text>
                  <Text style={styles.comparisonValue}>{Math.round(stateComparison.stateAverage)}%</Text>
                </View>
                <View style={styles.comparisonItem}>
                  <Text style={styles.comparisonLabel}>Percentile Rank</Text>
                  <Text style={styles.comparisonValue}>{Math.round(stateComparison.percentileRank)}th</Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1a1a1a',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  focusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  focusSection: {
    flex: 1,
  },
  focusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 8,
  },
  focusItem: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
  },
  comparisonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comparisonItem: {
    alignItems: 'center',
  },
  comparisonLabel: {
    fontSize: 14,
    color: '#888',
  },
  comparisonValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
});
