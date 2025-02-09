import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { routes } from '../lib/routes';

export function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.content}>
        <Text style={styles.copyright}>
          {new Date().getFullYear()} SparkShift. All rights reserved.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.title}>Product</Text>
        <Link href={routes.screens.pricing} asChild>
          <Pressable>
            <Text style={styles.link}>Pricing</Text>
          </Pressable>
        </Link>
        <Link href={routes.screens.resources} asChild>
          <Pressable>
            <Text style={styles.link}>Resources</Text>
          </Pressable>
        </Link>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.title}>Company</Text>
        <Link href={routes.screens.about} asChild>
          <Pressable>
            <Text style={styles.link}>About</Text>
          </Pressable>
        </Link>
        <Link href={routes.screens.contact} asChild>
          <Pressable>
            <Text style={styles.link}>Contact</Text>
          </Pressable>
        </Link>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.title}>Legal</Text>
        <Link href={routes.screens.privacy} asChild>
          <Pressable>
            <Text style={styles.link}>Privacy Policy</Text>
          </Pressable>
        </Link>
        <Link href={routes.screens.terms} asChild>
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
    backgroundColor: '#f9fafb',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  content: {
    alignItems: 'center',
    marginBottom: 24,
  },
  copyright: {
    color: '#666',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  link: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
});
