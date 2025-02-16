import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocalSearchParams, router } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { PerformanceMetrics, Achievement } from '@/lib/services/analytics';

export default function TestSummaryScreen() {
  const { metrics } = useLocalSearchParams<{ metrics: string }>();
  const performanceMetrics: PerformanceMetrics = JSON.parse(metrics);

  const renderPercentileIndicator = (percentile: number) => {
    let color = '#DC2626'; // Red for low percentile
    if (percentile >= 90) color = '#059669'; // Green for high percentile
    else if (percentile >= 70) color = '#0EA5E9'; // Blue for good percentile
    else if (percentile >= 50) color = '#EAB308'; // Yellow for average percentile

    return (
      <View style={[styles.percentileIndicator, { backgroundColor: color }]}>
        <Text style={styles.percentileText}>{Math.round(percentile)}%</Text>
      </View>
    );
  };

  const renderAchievement = (achievement: Achievement) => (
    <Animated.View
      key={achievement.id}
      entering={FadeInUp.delay(200)}
      style={[
        styles.achievement,
        achievement.unlockedAt && styles.achievementUnlocked
      ]}
    >
      <Text style={styles.achievementIcon}>{achievement.icon}</Text>
      <View style={styles.achievementContent}>
        <Text style={styles.achievementTitle}>{achievement.title}</Text>
        <Text style={styles.achievementDescription}>{achievement.description}</Text>
        {achievement.progress !== undefined && (
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${(achievement.progress / achievement.requiredProgress!) * 100}%` }
              ]}
            />
          </View>
        )}
      </View>
    </Animated.View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/app_icon.png')}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={styles.title}>Test Summary</Text>
      </View>

      <Animated.View 
        entering={FadeInUp.duration(500)}
        style={styles.content}
      >
        <Card style={styles.scoreCard}>
          <CardContent>
            <Text style={styles.scoreTitle}>Overall Performance</Text>
            <Text style={styles.scoreValue}>{performanceMetrics.overallScore}%</Text>
            <View style={styles.ranks}>
              <View style={styles.rankItem}>
                <Text style={styles.rankLabel}>State Rank</Text>
                <Text style={styles.rankValue}>#{performanceMetrics.rank.state}</Text>
                <Text style={styles.rankTotal}>of {performanceMetrics.rank.totalUsers}</Text>
              </View>
              <View style={styles.rankDivider} />
              <View style={styles.rankItem}>
                <Text style={styles.rankLabel}>National Rank</Text>
                <Text style={styles.rankValue}>#{performanceMetrics.rank.national}</Text>
                <Text style={styles.rankTotal}>of {performanceMetrics.rank.totalUsers}</Text>
              </View>
            </View>
          </CardContent>
        </Card>

        <Card style={styles.metricsCard}>
          <CardContent>
            <Text style={styles.sectionTitle}>Time Performance</Text>
            <View style={styles.metric}>
              <View style={styles.metricHeader}>
                <Text style={styles.metricTitle}>Average Time per Question</Text>
                {renderPercentileIndicator(performanceMetrics.timeMetrics.timePercentile)}
              </View>
              <View style={styles.metricDetails}>
                <Text style={styles.metricValue}>
                  {performanceMetrics.timeMetrics.averageTimePerQuestion.toFixed(1)}s
                </Text>
                <Text style={styles.metricComparison}>
                  National Avg: {performanceMetrics.timeMetrics.nationalAverageTime.toFixed(1)}s
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>

        <Card style={styles.topicsCard}>
          <CardContent>
            <Text style={styles.sectionTitle}>Topic Breakdown</Text>
            {Object.entries(performanceMetrics.topicBreakdown).map(([topic, data]) => (
              <View key={topic} style={styles.topicItem}>
                <View style={styles.topicHeader}>
                  <Text style={styles.topicTitle}>{topic}</Text>
                  {renderPercentileIndicator(data.percentile)}
                </View>
                <View style={styles.topicDetails}>
                  <Text style={styles.topicScore}>{data.score.toFixed(1)}%</Text>
                  <Text style={styles.topicComparison}>
                    National Avg: {data.nationalAverage.toFixed(1)}%
                  </Text>
                  {data.improvement > 0 && (
                    <Text style={styles.improvement}>
                      +{data.improvement.toFixed(1)}% improvement
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </CardContent>
        </Card>

        <Card style={styles.achievementsCard}>
          <CardContent>
            <Text style={styles.sectionTitle}>Achievements</Text>
            {performanceMetrics.achievements.map(renderAchievement)}
          </CardContent>
        </Card>

        <View style={styles.actions}>
          <Button
            onClick={() => router.push('/test-prep/setup')}
            style={styles.actionButton}
          >
            Take Another Test
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/test-prep/analytics')}
            style={styles.actionButton}
          >
            View Detailed Analytics
          </Button>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  scoreCard: {
    backgroundColor: '#1E293B',
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0EA5E9',
    textAlign: 'center',
    marginBottom: 16,
  },
  ranks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rankItem: {
    alignItems: 'center',
  },
  rankLabel: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
  },
  rankValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  rankTotal: {
    fontSize: 12,
    color: '#94A3B8',
  },
  rankDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#334155',
  },
  metricsCard: {
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  metric: {
    marginBottom: 16,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  metricDetails: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  metricComparison: {
    fontSize: 14,
    color: '#6B7280',
  },
  percentileIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentileText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  topicsCard: {
    backgroundColor: '#ffffff',
  },
  topicItem: {
    marginBottom: 16,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  topicDetails: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  topicScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  topicComparison: {
    fontSize: 14,
    color: '#6B7280',
  },
  improvement: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  achievementsCard: {
    backgroundColor: '#ffffff',
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    marginBottom: 12,
    opacity: 0.6,
  },
  achievementUnlocked: {
    backgroundColor: '#ECFDF5',
    opacity: 1,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 2,
  },
  actions: {
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    width: '100%',
  },
});