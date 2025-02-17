import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { routes } from '../lib/routes';
import Animated, { FadeInUp } from 'react-native-reanimated';

export function Footer() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <Animated.View 
      entering={FadeInUp.duration(500)}
      style={styles.footer}
    >
      <View style={styles.content}>
        <Image 
          source={require('../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.copyright}>
          © {new Date().getFullYear()} SparkShift. All rights reserved.
        </Text>
      </View>
      
      <View style={[styles.sections, isMobile && styles.sectionsMobile]}>
        <View style={[styles.section, isMobile && styles.sectionMobile]}>
          <Text style={styles.title}>Product</Text>
          <Link href={routes.screens.pricing} asChild>
            <Pressable style={styles.linkContainer}>
              <Text style={styles.link}>Pricing</Text>
            </Pressable>
          </Link>
          <Link href={routes.screens.resources} asChild>
            <Pressable style={styles.linkContainer}>
              <Text style={styles.link}>Resources</Text>
            </Pressable>
          </Link>
        </View>
        
        <View style={[styles.section, isMobile && styles.sectionMobile]}>
          <Text style={styles.title}>Company</Text>
          <Link href={routes.screens.about} asChild>
            <Pressable style={styles.linkContainer}>
              <Text style={styles.link}>About</Text>
            </Pressable>
          </Link>
          <Link href={routes.screens.contact} asChild>
            <Pressable style={styles.linkContainer}>
              <Text style={styles.link}>Contact</Text>
            </Pressable>
          </Link>
        </View>
        
        <View style={[styles.section, isMobile && styles.sectionMobile]}>
          <Text style={styles.title}>Legal</Text>
          <Link href={routes.screens.privacy} asChild>
            <Pressable style={styles.linkContainer}>
              <Text style={styles.link}>Privacy Policy</Text>
            </Pressable>
          </Link>
          <Link href={routes.screens.terms} asChild>
            <Pressable style={styles.linkContainer}>
              <Text style={styles.link}>Terms of Service</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      {isMobile && (
        <Text style={styles.mobileDisclaimer}>
          SparkShift is available on Web, iOS, and Android
        </Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#0A0B1E',
    padding: 40,
    borderTopWidth: 1,
    borderTopColor: '#1A1B3E',
  },
  content: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 48,
    height: 48,
    marginBottom: 16,
  },
  copyright: {
    color: '#5DADE2',
    fontSize: 14,
    textAlign: 'center',
  },
  sections: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 48,
  },
  sectionsMobile: {
    flexDirection: 'column',
    gap: 32,
  },
  section: {
    minWidth: 160,
  },
  sectionMobile: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  linkContainer: {
    padding: 8,
  },
  link: {
    color: '#5DADE2',
    fontSize: 14,
    textAlign: 'center',
  },
  mobileDisclaimer: {
    color: '#5DADE2',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 32,
    opacity: 0.8,
  },
});