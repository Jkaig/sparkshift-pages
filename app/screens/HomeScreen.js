import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>SparkShift</Text>
        <Text style={styles.subtitle}>
          Empowering Electrical Professionals with Smart Solutions
        </Text>
        <View style={styles.buttonContainer}>
          <Link href="/pricing" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Pricing</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View style={styles.features}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={[styles.featureGrid, isMobile && styles.featureGridMobile]}>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Smart Scheduling</Text>
            <Text style={styles.featureText}>
              Efficiently manage your appointments and work schedule
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Resource Library</Text>
            <Text style={styles.featureText}>
              Access a comprehensive collection of electrical resources
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Progress Tracking</Text>
            <Text style={styles.featureText}>
              Monitor your professional development and certifications
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.cta}>
        <Text style={styles.ctaText}>Ready to transform your electrical business?</Text>
        <Link href="/contact" asChild>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Get Started</Text>
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
    fontSize: 32,
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
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 15,
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
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
