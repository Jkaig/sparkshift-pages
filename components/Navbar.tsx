import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export function Navbar() {
  return (
    <View style={styles.navbar}>
      <Link href="/" asChild>
        <Pressable>
          <Text style={styles.logo}>SparkShift</Text>
        </Pressable>
      </Link>
      <View style={styles.links}>
        <Link href="/pricing" asChild>
          <Pressable>
            <Text style={styles.link}>Pricing</Text>
          </Pressable>
        </Link>
        <Link href="/resources" asChild>
          <Pressable>
            <Text style={styles.link}>Resources</Text>
          </Pressable>
        </Link>
        <Link href="/contact" asChild>
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  link: {
    fontSize: 16,
    color: '#4B5563',
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
