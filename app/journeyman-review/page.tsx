import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as Linking from 'expo-linking';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function JourneymanReviewPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const openApp = async () => {
    try {
      const url = `sparkshift://journeyman-review/${id}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        // If app URL not supported, open store
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
      <Animated.View 
        entering={FadeInUp.duration(1000)}
        style={styles.content}
      >
        <Image
          source={require('@/assets/app_icon.png')}
          style={styles.logo}
          resizeMode="contain"
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
              resizeMode="contain"
            />
          </Pressable>
          
          <Pressable 
            style={styles.storeButton}
            onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.sparkshift.app')}
          >
            <Image
              source={require('@/assets/play-store-badge.png')}
              style={styles.storeBadge}
              resizeMode="contain"
            />
          </Pressable>
        </View>

        <Pressable 
          style={styles.openButton}
          onPress={openApp}
        >
          <Text style={styles.openButtonText}>Open in App</Text>
        </Pressable>
      </Animated.View>
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
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
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