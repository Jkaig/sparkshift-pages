import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { routes } from '../../lib/routes';

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => (
  <Animated.View 
    entering={FadeInUp.duration(800)}
    style={styles.featureCard}
  >
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureText}>{description}</Text>
  </Animated.View>
);

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <ScrollView style={styles.container}>
      <Animated.View 
        entering={FadeInUp.duration(1000)}
        style={styles.hero}
      >
        <Text style={styles.title}>SparkShift</Text>
        <Text style={styles.subtitle}>
          Empowering Electrical Professionals with Smart Solutions
        </Text>
        <View style={styles.buttonContainer}>
          <Link href={routes.screens.pricing} asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Pricing</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </Animated.View>

      <View style={styles.features}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={[styles.featureGrid, isMobile && styles.featureGridMobile]}>
          <FeatureCard
            title="Smart Scheduling"
            description="Efficiently manage your appointments and work schedule"
          />
          <FeatureCard
            title="Resource Library"
            description="Access a comprehensive collection of electrical resources"
          />
          <FeatureCard
            title="Progress Tracking"
            description="Monitor your professional development and certifications"
          />
        </View>
      </View>

      <Animated.View 
        entering={FadeInUp.duration(1200)}
        style={styles.cta}
      >
        <Text style={styles.ctaText}>Ready to transform your electrical business?</Text>
        <Link href={routes.screens.contact} asChild>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Get Started</Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  hero: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  features: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
    textAlign: 'center',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  featureGridMobile: {
    flexDirection: 'column',
  },
  featureCard: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 10,
    width: 300,
    minHeight: 200,
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#cccccc',
    lineHeight: 24,
  },
  cta: {
    padding: 40,
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    margin: 20,
    borderRadius: 15,
  },
  ctaText: {
    fontSize: 28,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  ctaButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 30,
  },
  ctaButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
