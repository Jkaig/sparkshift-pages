import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Animated } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuthContext } from '@/lib/providers/AuthProvider';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '@/lib/services/firebase';

export default function ProfileScreen() {
  const { user, profile } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim2, {
      toValue: 1,
      duration: 500,
      delay: 200,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim3, {
      toValue: 1,
      duration: 500,
      delay: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Animated.View 
          style={[
            styles.profileHeader,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              }],
            },
          ]}
        >
          <View style={styles.avatarContainer}>
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>
                  {user?.displayName?.[0] || user?.email?.[0] || '?'}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.name}>{user?.displayName || 'User'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </Animated.View>
      </View>

      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.section,
            {
              opacity: fadeAnim2,
              transform: [{
                translateY: fadeAnim2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Subscription</Text>
          <Card>
            <View style={styles.cardContent}>
              <View style={styles.subscriptionHeader}>
                <Text style={styles.planName}>
                  {profile?.subscriptionTier === 'pro' ? 'Pro Plan' : 'Free Plan'}
                </Text>
                {profile?.subscriptionTier === 'pro' && (
                  <View style={[styles.badge, { backgroundColor: '#059669' }]}>
                    <Text style={styles.badgeText}>Active</Text>
                  </View>
                )}
              </View>
              {profile?.subscriptionTier === 'pro' ? (
                <Text style={styles.subscriptionInfo}>
                  Your subscription is active until{' '}
                  {formatDate(profile.subscriptionEndDate)}
                </Text>
              ) : (
                <Text style={styles.subscriptionInfo}>
                  Upgrade to Pro to unlock all features
                </Text>
              )}
              <Link href="/subscription" asChild>
                <Button variant="outline">
                  {profile?.subscriptionTier === 'pro' ? 'Manage Subscription' : 'Upgrade to Pro'}
                </Button>
              </Link>
            </View>
          </Card>
        </Animated.View>

        <Animated.View 
          style={[
            styles.section,
            {
              opacity: fadeAnim3,
              transform: [{
                translateY: fadeAnim3.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Account Actions</Text>
          <Card>
            <View style={styles.cardContent}>
              <Button 
                variant="outline" 
                onPress={handleSignOut}
                style={styles.dangerButton}
              >
                Sign Out
              </Button>
            </View>
          </Card>
        </Animated.View>
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
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 36,
    color: '#fff',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#999',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  cardContent: {
    padding: 16,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  subscriptionInfo: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  dangerButton: {
    borderColor: '#dc2626',
  },
});