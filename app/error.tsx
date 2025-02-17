'use client';

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function ErrorScreen({ error, retry }: { error: Error; retry?: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.subtitle}>Something went wrong</Text>
      <Text style={styles.error}>{error.message}</Text>
      <View style={styles.actions}>
        {retry && (
          <Pressable style={styles.retryButton} onPress={retry}>
            <Text style={styles.buttonText}>Try Again</Text>
          </Pressable>
        )}
        <Link href="/" asChild>
          <Pressable style={styles.homeButton}>
            <Text style={styles.buttonText}>Return Home</Text>
          </Pressable>
        </Link>
      </View>
      <Text style={styles.supportText}>
        If this problem persists, please contact our support team
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#0A0B1E',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#5DADE2',
    marginBottom: 16,
  },
  error: {
    color: '#FF3B30',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 400,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  retryButton: {
    backgroundColor: '#3498DB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  homeButton: {
    backgroundColor: '#2C3E50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  supportText: {
    color: '#5DADE2',
    fontSize: 14,
    marginTop: 32,
  },
});