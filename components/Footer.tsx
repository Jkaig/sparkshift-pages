import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { routes } from '../lib/routes';
import { Ionicons } from '@expo/vector-icons';
import { BRAND } from '../app/constants';

export function Footer() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.footer}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Ionicons name="flash" size={32} color="#3498DB" />
          <Text style={styles.logoText}>{BRAND.NAME}</Text>
        </View>
        <Text style={styles.copyright}>
          {new Date().getFullYear()} {BRAND.NAME}. All rights reserved.
        </Text>
      </View>
      
      <View style={styles.links}>
        {routes.map((route) => (
          <Link key={route.path} href={route.path} asChild>
            <Pressable style={styles.link}>
              <Text style={styles.linkText}>{route.name}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
  },
  copyright: {
    color: '#666',
    fontSize: 14,
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  link: {
    padding: 10,
  },
  linkText: {
    color: '#333',
    fontSize: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498DB',
  },
});