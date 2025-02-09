import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.section}>
        <Text style={styles.logo}>SparkShift</Text>
        <Text style={styles.description}>
          Empowering businesses with innovative solutions
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.title}>Product</Text>
        <Link href="/pricing" asChild>
          <Pressable>
            <Text style={styles.link}>Pricing</Text>
          </Pressable>
        </Link>
        <Link href="/resources" asChild>
          <Pressable>
            <Text style={styles.link}>Resources</Text>
          </Pressable>
        </Link>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.title}>Company</Text>
        <Link href="/about" asChild>
          <Pressable>
            <Text style={styles.link}>About</Text>
          </Pressable>
        </Link>
        <Link href="/contact" asChild>
          <Pressable>
            <Text style={styles.link}>Contact</Text>
          </Pressable>
        </Link>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.title}>Legal</Text>
        <Link href="/privacy" asChild>
          <Pressable>
            <Text style={styles.link}>Privacy Policy</Text>
          </Pressable>
        </Link>
        <Link href="/terms" asChild>
          <Pressable>
            <Text style={styles.link}>Terms of Service</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#F9FAFB',
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  section: {
    flex: 1,
    marginHorizontal: 12,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  description: {
    color: '#6B7280',
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  link: {
    color: '#6B7280',
    marginBottom: 12,
  },
});
