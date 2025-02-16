import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { format, subDays } from 'date-fns';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';

const width = Dimensions.get('window').width - 40;
const height = 200;

interface PerformanceData {
  date: Date;
  score: number;
}

const mockPerformanceData: PerformanceData[] = Array.from({ length: 7 }, (_, i) => ({
  date: subDays(new Date(), i),
  score: Math.round(70 + Math.random() * 20),
})).reverse();

const xScale = scaleTime({
  domain: [mockPerformanceData[0].date, mockPerformanceData[mockPerformanceData.length - 1].date],
  range: [0, width],
});

const yScale = scaleLinear({
  domain: [0, 100],
  range: [height, 0],
});

export default function AnalyticsScreen() {
  const averageScore = Math.round(
    mockPerformanceData.reduce((acc, curr) => acc + curr.score, 0) / mockPerformanceData.length
  );

  const weakestTopics = [
    { topic: 'Motor Controls', accuracy: '65%' },
    { topic: 'Load Calculations', accuracy: '72%' },
    { topic: 'Grounding Methods', accuracy: '75%' },
  ];

  const strongestTopics = [
    { topic: 'Safety Regulations', accuracy: '95%' },
    { topic: 'Circuit Theory', accuracy: '92%' },
    { topic: 'Wiring Methods', accuracy: '88%' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Performance Analytics</Text>
        <Text style={styles.subtitle}>Track your progress and identify areas for improvement</Text>
      </View>

      <Animated.View entering={FadeInUp.duration(500)}>
        <Card style={styles.card}>
          <CardContent>
            <Text style={styles.cardTitle}>Performance Trend</Text>
            <View style={styles.chartContainer}>
              <svg width={width} height={height}>
                <Group>
                  <LinePath
                    data={mockPerformanceData}
                    x={d => xScale(d.date)}
                    y={d => yScale(d.score)}
                    stroke="#007AFF"
                    strokeWidth={2}
                  />
                </Group>
              </svg>
            </View>
            <View style={styles.legendContainer}>
              {mockPerformanceData.map((data, index) => (
                <Text key={index} style={styles.legendText}>
                  {format(data.date, 'MMM d')}: {data.score}%
                </Text>
              ))}
            </View>
          </CardContent>
        </Card>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(100).duration(500)}>
        <Card style={styles.card}>
          <CardContent>
            <Text style={styles.cardTitle}>Overall Performance</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{averageScore}%</Text>
                <Text style={styles.statLabel}>Average Score</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>42</Text>
                <Text style={styles.statLabel}>Questions Completed</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Study Hours</Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </Animated.View>

      <View style={styles.topicsContainer}>
        <Animated.View entering={FadeInUp.delay(200).duration(500)} style={styles.topicSection}>
          <Card style={styles.card}>
            <CardContent>
              <Text style={styles.cardTitle}>Areas for Improvement</Text>
              {weakestTopics.map((topic, index) => (
                <View key={index} style={styles.topicItem}>
                  <Text style={styles.topicName}>{topic.topic}</Text>
                  <Text style={[styles.topicAccuracy, styles.weakAccuracy]}>{topic.accuracy}</Text>
                </View>
              ))}
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.topicSection}>
          <Card style={styles.card}>
            <CardContent>
              <Text style={styles.cardTitle}>Strong Areas</Text>
              {strongestTopics.map((topic, index) => (
                <View key={index} style={styles.topicItem}>
                  <Text style={styles.topicName}>{topic.topic}</Text>
                  <Text style={[styles.topicAccuracy, styles.strongAccuracy]}>{topic.accuracy}</Text>
                </View>
              ))}
            </CardContent>
          </Card>
        </Animated.View>
      </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  chartContainer: {
    marginVertical: 20,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#666666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  topicsContainer: {
    marginBottom: 20,
  },
  topicSection: {
    marginBottom: 20,
  },
  topicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  topicName: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  topicAccuracy: {
    fontSize: 16,
    fontWeight: '600',
  },
  weakAccuracy: {
    color: '#dc2626',
  },
  strongAccuracy: {
    color: '#059669',
  },
});