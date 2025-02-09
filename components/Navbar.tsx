import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { routes } from '../lib/routes';

export function Navbar() {
  return (
    <View style={styles.navbar}>
      <Link href={routes.screens.home} asChild>
        <Pressable>
          <Text style={styles.logo}>SparkShift</Text>
        </Pressable>
      </Link>
      <View style={styles.links}>
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
        <Link href={routes.screens.contact} asChild>
          <Pressable>
            <Text style={styles.link}>Contact</Text>
          </Pressable>
        </Link>
        <Link href="/login" asChild>
          <Pressable style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  link: {
    fontSize: 16,
    color: '#666',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
