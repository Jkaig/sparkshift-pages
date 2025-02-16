import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface QuizCategory {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  completedQuestions: number;
  icon: keyof typeof Ionicons.glyphMap;
}

const categories: QuizCategory[] = [
  {
    id: 'electrical-theory',
    title: 'Electrical Theory',
    description: 'Fundamental concepts of electricity and circuit analysis',
    totalQuestions: 50,
    completedQuestions: 25,
    icon: 'flash',
  },
  {
    id: 'nec-code',
    title: 'NEC Code',
    description: 'National Electrical Code requirements and applications',
    totalQuestions: 75,
    completedQuestions: 30,
    icon: 'book',
  },
  {
    id: 'safety',
    title: 'Safety Practices',
    description: 'Electrical safety procedures and OSHA requirements',
    totalQuestions: 40,
    completedQuestions: 15,
    icon: 'shield-checkmark',
  },
  {
    id: 'calculations',
    title: 'Electrical Calculations',
    description: 'Load calculations, voltage drop, and sizing',
    totalQuestions: 60,
    completedQuestions: 20,
    icon: 'calculator',
  },
];

export default function TestPrepScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const renderProgressBar = (completed: number, total: number) => {
    const progress = (completed / total) * 100;
    return (
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
        <Text style={styles.progressText}>{`${completed}/${total} Completed`}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Test Preparation</Text>
        <Text style={styles.subtitle}>Master your electrical exam with our comprehensive practice tests</Text>
      </View>

      <View style={styles.stats}>
        <Card>
          <CardContent>
            <View style={styles.statsContent}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>85%</Text>
                <Text style={styles.statLabel}>Average Score</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>42</Text>
                <Text style={styles.statLabel}>Questions Today</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Days Streak</Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      <View style={styles.categories}>
        {categories.map((category, index) => (
          <Animated.View
            key={category.id}
            entering={FadeInUp.delay(index * 100)}
            style={styles.categoryCard}
          >
            <Pressable
              onPress={() => setSelectedCategory(category.id)}
              style={({ pressed }) => [
                styles.categoryButton,
                pressed && styles.categoryButtonPressed,
              ]}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name={category.icon} size={24} color="#007AFF" />
              </View>
              <View style={styles.categoryContent}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
                {renderProgressBar(category.completedQuestions, category.totalQuestions)}
              </View>
            </Pressable>
          </Animated.View>
        ))}
      </View>

      <View style={styles.actions}>
        <Button style={styles.actionButton}>
          Start Daily Quiz
        </Button>
        <Button variant="outline" style={styles.actionButton}>
          View Study Materials
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
    color: '#cccccc',
  },
  stats: {
    padding: 20,
  },
  statsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#333333',
  },
  categories: {
    padding: 20,
  },
  categoryCard: {
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryButtonPressed: {
    opacity: 0.8,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 12,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#888888',
  },
  actions: {
    padding: 20,
    paddingBottom: 40,
  },
  actionButton: {
    marginBottom: 12,
  },
});