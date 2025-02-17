import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, useWindowDimensions } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuthContext } from '@/lib/providers/AuthProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '@/lib/services/firebase';

export default function ProfileScreen() {
  const { user, profile } = useAuthContext();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      router.replace('/');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Card style={styles.authCard}>
          <CardContent>
            <Text style={styles.authTitle}>Sign in to access your profile</Text>
            <Text style={styles.authDescription}>
              Track your progress and manage your account settings
            </Text>
            <Link href="/login" asChild>
              <Button style={styles.authButton}>
                Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, isMobile && styles.headerMobile]}>
        <Animated.View 
          entering={FadeInUp.duration(500)}
          style={styles.profileHeader}
        >
          <View style={styles.avatarContainer}>
            {user.photoURL ? (
              <Image 
                source={{ uri: user.photoURL }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                </Text>
              </View>
            )}
            <Pressable style={styles.editAvatarButton}>
              <Ionicons name="camera" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
          <Text style={styles.name}>{user.displayName || 'User'}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </Animated.View>
      </View>

      <View style={styles.content}>
        <Animated.View 
          entering={FadeInUp.delay(200).duration(500)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Subscription</Text>
          <Card>
            <CardContent>
              <View style={styles.subscriptionInfo}>
                <View style={styles.subscriptionHeader}>
                  <Text style={styles.planName}>
                    {profile?.subscriptionTier === 'pro' ? 'Pro Plan' : 'Free Plan'}
                  </Text>
                  {profile?.subscriptionTier === 'pro' && (
                    <Badge style={styles.activeBadge}>
                      <Text style={styles.badgeText}>Active</Text>
                    </Badge>
                  )}
                </View>
                {profile?.subscriptionTier === 'pro' ? (
                  <>
                    <Text style={styles.subscriptionDetail}>
                      Next billing date: {new Date(profile.subscriptionEndDate).toLocaleDateString()}
                    </Text>
                    <Button variant="outline" style={styles.manageButton}>
                      Manage Subscription
                    </Button>
                  </>
                ) : (
                  <Link href="/pricing" asChild>
                    <Button style={styles.upgradeButton}>
                      Upgrade to Pro
                    </Button>
                  </Link>
                )}
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(400).duration(500)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <Card>
            <CardContent>
              <View style={styles.settingsList}>
                <Pressable style={styles.settingItem}>
                  <View style={styles.settingContent}>
                    <Ionicons name="person-outline" size={24} color="#5DADE2" />
                    <View style={styles.settingTexts}>
                      <Text style={styles.settingTitle}>Profile Information</Text>
                      <Text style={styles.settingDescription}>Update your personal details</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="#5DADE2" />
                </Pressable>

                <Pressable style={styles.settingItem}>
                  <View style={styles.settingContent}>
                    <Ionicons name="notifications-outline" size={24} color="#5DADE2" />
                    <View style={styles.settingTexts}>
                      <Text style={styles.settingTitle}>Notifications</Text>
                      <Text style={styles.settingDescription}>Manage your notification preferences</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="#5DADE2" />
                </Pressable>

                <Pressable style={styles.settingItem}>
                  <View style={styles.settingContent}>
                    <Ionicons name="lock-closed-outline" size={24} color="#5DADE2" />
                    <View style={styles.settingTexts}>
                      <Text style={styles.settingTitle}>Security</Text>
                      <Text style={styles.settingDescription}>Update password and security settings</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="#5DADE2" />
                </Pressable>
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(600).duration(500)}
          style={[styles.section, styles.dangerZone]}
        >
          <Text style={styles.sectionTitle}>Account Actions</Text>
          <Card>
            <CardContent>
              <Button 
                variant="destructive"
                onClick={handleSignOut}
                disabled={loading}
                style={styles.signOutButton}
              >
                {loading ? 'Signing Out...' : 'Sign Out'}
              </Button>
            </CardContent>
          </Card>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0B1E',
  },
  header: {
    backgroundColor: '#16213E',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  headerMobile: {
    paddingVertical: 32,
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1A1B3E',
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#3498DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3498DB',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#16213E',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#5DADE2',
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subscriptionInfo: {
    gap: 16,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  activeBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  subscriptionDetail: {
    fontSize: 14,
    color: '#666666',
  },
  manageButton: {
    marginTop: 8,
  },
  upgradeButton: {
    marginTop: 8,
  },
  settingsList: {
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingTexts: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666666',
  },
  dangerZone: {
    marginTop: 48,
  },
  signOutButton: {
    width: '100%',
  },
  // Auth card styles
  authCard: {
    margin: 24,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  authDescription: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
    textAlign: 'center',
  },
  authButton: {
    width: '100%',
  },
});

const Badge = ({ children, style }) => (
  <View style={[styles.activeBadge, style]}>
    {children}
  </View>
);