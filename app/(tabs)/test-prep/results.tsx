import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { router } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function ResultsScreen() {
  const mockResults = {
    score: 80,
    totalQuestions: 10,
    correctAnswers: 8,
    timeSpent: '12:45',
    accuracy: '80%',
    improvement: '+5%',
    weakTopics: [
      'Voltage Drop Calculations',
      'Motor Control Circuits',
    ],
    strongTopics: [
      'General Safety',
      'Conductor Sizing',
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quiz Results</Text>
        <Text style={styles.subtitle}>Great job! Here's how you performed</Text>
      </View>

      <Animated.View entering={FadeInUp.duration(500)}>
        <Card style={styles.scoreCard}>
          <CardContent>
            <View style={styles.scoreContainer}>
              <Text style={styles.score}>{mockResults.score}%</Text>
              <Text style={styles.scoreLabel}>Overall Score</Text>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{mockResults.correctAnswers}/{mockResults.totalQuestions}</Text>
                <Text style={styles.statLabel}>Correct Answers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{mockResults.timeSpent}</Text>
                <Text style={styles.statLabel}>Time Spent</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{mockResults.improvement}</Text>
                <Text style={styles.statLabel}>Improvement</Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(100).duration(500)}>
        <Card style={styles.topicsCard}>
          <CardContent>
            <Text style={styles.sectionTitle}>Areas for Review</Text>
            {mockResults.weakTopics.map((topic, index) => (
              <View key={index} style={styles.topicItem}>
                <Ionicons name="alert-circle" size={24} color="#dc2626" />
                <Text style={styles.topicText}>{topic}</Text>
              </View>
            ))}
          </CardContent>
        </Card>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(200).duration(500)}>
        <Card style={styles.topicsCard}>
          <CardContent>
            <Text style={styles.sectionTitle}>Strong Performance</Text>
            {mockResults.strongTopics.map((topic, index) => (
              <View key={index} style={styles.topicItem}>
                <Ionicons name="checkmark-circle" size={24} color="#059669" />
                <Text style={styles.topicText}>{topic}</Text>
              </View>
            ))}
          </CardContent>
        </Card>
      </Animated.View>

      <View style={styles.actions}>
        <Button onPress={() => router.push('/test-prep')}>
          Return to Test Prep
        </Button>
        <Button 
          variant="outline" 
          onPress={() => router.push('/test-prep/review')}
          style={styles.reviewButton}
        >
          Review Answers
        </Button>
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
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
  },
  scoreCard: {
    margin: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  topicsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  topicText: {
    fontSize: 16,
    color: '#1a1a1a',
    marginLeft: 12,
  },
  actions: {
    padding: 20,
    paddingBottom: 40,
  },
  reviewButton: {
    marginTop: 12,
  },
});