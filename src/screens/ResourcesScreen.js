import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const ResourcesScreen = () => {
  const resources = [
    {
      icon: '📚',
      title: 'Study Guides',
      description: 'Comprehensive study materials covering essential electrical concepts and exam preparation.',
      action: 'Access Guides',
    },
    {
      icon: '✍️',
      title: 'Practice Tests',
      description: 'Test your knowledge with our extensive collection of practice exams and quizzes.',
      action: 'Start Practice',
    },
    {
      icon: '🎥',
      title: 'Video Tutorials',
      description: 'Watch expert-led video tutorials explaining complex electrical concepts.',
      action: 'Watch Videos',
    },
    {
      icon: '👥',
      title: 'Community Forum',
      description: 'Connect with fellow apprentices, share experiences, and get answers to your questions.',
      action: 'Join Discussion',
    },
  ];

  const tools = [
    {
      icon: '🧮',
      title: 'Electrical Calculator',
      description: 'Calculate voltage, current, resistance, and more with our specialized calculator.',
    },
    {
      icon: '📋',
      title: 'Code Reference',
      description: 'Quick access to electrical codes and standards for your region.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Learning Resources</Text>
          <Text style={styles.subtitle}>
            Enhance your electrical apprenticeship journey with our comprehensive resources
          </Text>
        </View>

        <View style={styles.resourcesContainer}>
          {resources.map((resource, index) => (
            <View key={index} style={styles.resourceCard}>
              <Text style={styles.resourceIcon}>{resource.icon}</Text>
              <Text style={styles.resourceTitle}>{resource.title}</Text>
              <Text style={styles.resourceDescription}>
                {resource.description}
              </Text>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>{resource.action}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.toolsSection}>
          <Text style={styles.sectionTitle}>Essential Tools</Text>
          <View style={styles.toolsContainer}>
            {tools.map((tool, index) => (
              <View key={index} style={styles.toolCard}>
                <Text style={styles.toolIcon}>{tool.icon}</Text>
                <Text style={styles.toolTitle}>{tool.title}</Text>
                <Text style={styles.toolDescription}>{tool.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    maxWidth: Platform.OS === 'web' ? 1200 : '100%',
    marginHorizontal: Platform.OS === 'web' ? 'auto' : 0,
  },
  header: {
    padding: Platform.OS === 'web' ? 40 : 20,
    alignItems: 'center',
    maxWidth: Platform.OS === 'web' ? 800 : '100%',
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: Platform.OS === 'web' ? 48 : 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? 20 : 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  resourcesContainer: {
    padding: 20,
    maxWidth: Platform.OS === 'web' ? 1200 : '100%',
    marginHorizontal: 'auto',
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  resourceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: Platform.OS === 'web' ? 30 : 20,
    margin: Platform.OS === 'web' ? 15 : 0,
    marginBottom: 20,
    alignItems: 'center',
    width: Platform.OS === 'web' ? 500 : '100%',
  },
  resourceIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  resourceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
    textAlign: 'center',
  },
  resourceDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  actionButtonText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  toolsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
  },
  toolsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: Platform.OS === 'web' ? 1200 : '100%',
    marginHorizontal: 'auto',
  },
  toolCard: {
    width: Platform.OS === 'web' ? 350 : (width - 60) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: Platform.OS === 'web' ? 30 : 20,
    margin: Platform.OS === 'web' ? 15 : 0,
    marginBottom: 20,
    alignItems: 'center',
  },
  toolIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  toolTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
    textAlign: 'center',
  },
  toolDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default ResourcesScreen;
