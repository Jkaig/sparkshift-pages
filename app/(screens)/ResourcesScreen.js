import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';

export default function ResourcesScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const resources = [
    {
      title: 'Apprentice Evaluation',
      description: 'Comprehensive guide for evaluating apprentice performance and progress tracking.',
      category: 'Training',
    },
    {
      title: 'Journeyman Review',
      description: 'Detailed materials to help prepare for journeyman certification exams.',
      category: 'Certification',
    },
    {
      title: 'Safety Guidelines',
      description: 'Up-to-date electrical safety protocols and best practices.',
      category: 'Safety',
    },
    {
      title: 'Code Updates',
      description: 'Latest electrical code changes and compliance requirements.',
      category: 'Compliance',
    },
    {
      title: 'Business Tools',
      description: 'Templates and tools for managing your electrical business effectively.',
      category: 'Business',
    },
    {
      title: 'Technical Library',
      description: 'Extensive collection of technical documentation and guides.',
      category: 'Technical',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Resources</Text>
        <Text style={styles.subtitle}>
          Access our comprehensive collection of electrical industry resources
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search Resources</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.resourcesGrid, isMobile && styles.resourcesGridMobile]}>
        {resources.map((resource, index) => (
          <View key={index} style={styles.resourceCard}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{resource.category}</Text>
            </View>
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourceDescription}>
              {resource.description}
            </Text>
            <TouchableOpacity style={styles.accessButton}>
              <Text style={styles.accessButtonText}>Access Resource</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.premiumSection}>
        <Text style={styles.premiumTitle}>Premium Resources</Text>
        <Text style={styles.premiumDescription}>
          Unlock access to our complete library of premium resources, including advanced training materials and exclusive content.
        </Text>
        <Link href="/pricing" asChild>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
          </TouchableOpacity>
        </Link>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#cccccc',
    textAlign: 'center',
  },
  searchContainer: {
    padding: 20,
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    padding: 20,
  },
  resourcesGridMobile: {
    flexDirection: 'column',
  },
  resourceCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 20,
    width: 300,
    minHeight: 200,
  },
  categoryBadge: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 15,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  resourceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  resourceDescription: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 20,
    lineHeight: 24,
  },
  accessButton: {
    backgroundColor: '#2c2c2c',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  accessButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  premiumSection: {
    backgroundColor: '#2a2a2a',
    margin: 20,
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  premiumDescription: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  upgradeButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  upgradeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
