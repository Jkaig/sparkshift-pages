'use client';

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as Linking from 'expo-linking';
import { FontAwesome } from '@expo/vector-icons';

export default function JourneymanReviewPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const openApp = async () => {
    try {
      const url = `sparkshift://journeyman-review/${id}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        if (Platform.OS === 'ios') {
          Linking.openURL('https://apps.apple.com/app/sparkshift/id123456789');
        } else {
          Linking.openURL('https://play.google.com/store/apps/details?id=com.sparkshift.app');
        }
      }
    } catch (error) {
      console.error('Error opening app:', error);
    }
  };

  useEffect(() => {
    if (!id) {
      router.replace('/');
    }
  }, [id]);

  if (!id) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Review Ready</Text>
        
        <Text style={styles.description}>
          Your journeyman evaluation review is ready in the SparkShift app.
        </Text>

        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.storeButton}
            onPress={() => Linking.openURL('https://apps.apple.com/app/sparkshift/id123456789')}
          >
            <FontAwesome name="apple" size={24} color="white" />
            <Text style={styles.buttonText}>Download on the App Store</Text>
          </Pressable>

          <Pressable
            style={styles.storeButton}
            onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.sparkshift.app')}
          >
            <FontAwesome name="android" size={24} color="white" />
            <Text style={styles.buttonText}>Get it on Google Play</Text>
          </Pressable>
        </View>

        <Pressable 
          style={styles.openButton}
          onPress={openApp}
        >
          <Text style={styles.openButtonText}>Open in App</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
  },
  storeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  openButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  openButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});