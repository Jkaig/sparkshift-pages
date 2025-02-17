import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TestPrepPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Electrician Exam Prep</Text>
        <Text style={styles.subtitle}>Master your state's electrician exam with our comprehensive prep materials</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Practice</Text>
          <View style={styles.grid}>
            <Link href="/pricing" asChild>
              <Pressable style={styles.card}>
                <View style={styles.cardContent}>
                  <FontAwesome name="clock-o" size={24} color="#0066cc" style={styles.icon} />
                  <Text style={styles.cardTitle}>Quick 5-15 minute quizzes</Text>
                  <Text style={styles.cardDescription}>
                    Keep your knowledge sharp with our daily practice quizzes
                  </Text>
                  <Text style={styles.cardDescription}>
                    State-specific questions
                  </Text>
                  <Text style={styles.cardDescription}>
                    Progress tracking
                  </Text>
                  <Text style={styles.cardDescription}>
                    Detailed explanations
                  </Text>
                </View>
              </Pressable>
            </Link>

            <Link href="/resources" asChild>
              <Pressable style={styles.card}>
                <View style={styles.cardContent}>
                  <FontAwesome name="book" size={24} color="#0066cc" style={styles.icon} />
                  <Text style={styles.cardTitle}>Study Resources</Text>
                  <Text style={styles.cardDescription}>
                    Comprehensive materials to build a strong foundation
                  </Text>
                  <Text style={styles.cardDescription}>
                    Code references
                  </Text>
                  <Text style={styles.cardDescription}>
                    Study guides
                  </Text>
                  <Text style={styles.cardDescription}>
                    Practice problems
                  </Text>
                </View>
              </Pressable>
            </Link>
          </View>
        </View>

        <View style={styles.callout}>
          <Text style={styles.calloutTitle}>Ready to Get Started?</Text>
          <Text style={styles.calloutText}>
            Join thousands of successful electricians who prepared with our materials.
          </Text>
          <Link href="/pricing" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Start Free Trial</Text>
            </Pressable>
          </Link>
          <Link href="/resources" asChild>
            <Pressable style={styles.buttonOutline}>
              <Text style={styles.buttonTextOutline}>Browse Resources</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    padding: 20,
  },
  icon: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  callout: {
    backgroundColor: '#e6f0ff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  calloutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  calloutText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonOutline: {
    borderColor: '#0066cc',
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonTextOutline: {
    color: '#0066cc',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
