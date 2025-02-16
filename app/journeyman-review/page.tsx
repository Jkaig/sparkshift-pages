import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function JourneymanReviewPage() {
  const { id } = useLocalSearchParams();

  const openApp = async () => {
    try {
      // Try to open the app with the review ID
      const url = `sparkshift://review?evaluationId=${id}`;
      const canOpen = await Linking.canOpenURL(url);
      
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        // If can't open, redirect to appropriate store
        if (Platform.OS === 'ios') {
          await Linking.openURL('https://apps.apple.com/app/sparkshift/id123456789');
        } else {
          await Linking.openURL('https://play.google.com/store/apps/details?id=com.sparkshift.app');
        }
      }
    } catch (error) {
      console.error('Error opening app:', error);
    }
  };

  useEffect(() => {
    if (id) {
      openApp();
    }
  }, [id]);

  return (
    <View style={styles.container}>
      <Animated.View 
        entering={FadeInUp.duration(1000)}
        style={styles.content}
      >
        <Image
          source={require('@/assets/app_icon.png')}
          style={styles.logo}
          contentFit="contain"
        />
        
        <Text style={styles.title}>Review Ready</Text>
        
        <Text style={styles.description}>
          Your journeyman evaluation review is ready in the SparkShift app.
        </Text>

        <View style={styles.storeButtons}>
          <Pressable 
            style={styles.storeButton}
            onPress={() => Linking.openURL('https://apps.apple.com/app/sparkshift/id123456789')}
          >
            <Image
              source={require('@/assets/app-store-badge.png')}
              style={styles.storeBadge}
              contentFit="contain"
            />
          </Pressable>
          
          <Pressable 
            style={styles.storeButton}
            onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.sparkshift.app')}
          >
            <Image
              source={require('@/assets/play-store-badge.png')}
              style={styles.storeBadge}
              contentFit="contain"
            />
          </Pressable>
        </View>

        <Pressable 
          style={styles.openButton}
          onPress={openApp}
        >
          <Text style={styles.openButtonText}>Open in SparkShift App</Text>
        </Pressable>

        <Text style={styles.note}>
          Already have the app? Click "Open in SparkShift App" or try refreshing this page.
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 500,
    width: '100%',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
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
  storeButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  storeButton: {
    height: 48,
  },
  storeBadge: {
    height: '100%',
    width: 162,
  },
  openButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  openButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  note: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },
});