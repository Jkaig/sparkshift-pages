import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const resources = [
  {
    title: "Study Guides",
    description: "Comprehensive guides covering all exam topics",
    category: "Exam Prep",
    link: "/study-guides"
  },
  {
    title: "Practice Tests",
    description: "Full-length practice exams with detailed explanations",
    category: "Testing",
    link: "/practice-tests"
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video explanations of key concepts",
    category: "Learning",
    link: "/tutorials"
  },
  {
    title: "Flashcards",
    description: "Interactive flashcards for quick review",
    category: "Study Tools",
    link: "/flashcards"
  },
  {
    title: "Code References",
    description: "Quick access to important code references",
    category: "Reference",
    link: "/code-refs"
  },
  {
    title: "Community Forum",
    description: "Connect with other exam candidates",
    category: "Community",
    link: "/forum"
  }
];

export default function ResourcesPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Learning Resources</Text>
        <Text style={styles.subtitle}>Everything you need to prepare for your exam</Text>
      </View>

      <View style={styles.resourcesGrid}>
        {resources.map((resource) => (
          <Link key={resource.title} href={resource.link} asChild>
            <Pressable style={styles.resourceCard}>
              <View style={styles.cardContent}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{resource.category}</Text>
                </View>
                <Text style={styles.resourceTitle}>{resource.title}</Text>
                <Text style={styles.resourceDescription}>{resource.description}</Text>
                <View style={styles.arrow}>
                  <FontAwesome name="arrow-right" size={16} color="#0066cc" />
                </View>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>

      <View style={styles.callout}>
        <Text style={styles.calloutTitle}>Need Help?</Text>
        <Text style={styles.calloutText}>
          Our support team is here to help you find the right resources for your exam preparation.
        </Text>
        <Link href="/contact" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Contact Support</Text>
          </Pressable>
        </Link>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  resourcesGrid: {
    padding: 20,
  },
  resourceCard: {
    backgroundColor: 'white',
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
  categoryBadge: {
    backgroundColor: '#e6f0ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    color: '#0066cc',
    fontSize: 14,
    fontWeight: 'bold',
  },
  resourceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resourceDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  arrow: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  callout: {
    margin: 20,
    padding: 20,
    backgroundColor: '#e6f0ff',
    borderRadius: 12,
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
});
