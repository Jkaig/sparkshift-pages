import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { routes } from '../lib/routes';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export function Navbar() {
  const { width } = useWindowDimensions();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = width < 768;

  return (
    <Animated.View 
      entering={FadeInDown.duration(500)}
      style={styles.navbar}
    >
      <Link href={routes.screens.home} asChild>
        <Pressable style={styles.logoContainer}>
          <Image 
            source={require('../assets/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>SparkShift</Text>
        </Pressable>
      </Link>

      {isMobile ? (
        <View style={styles.mobileNav}>
          <Pressable 
            style={styles.menuButton}
            onPress={() => setMenuOpen(!menuOpen)}
          >
            <Ionicons 
              name={menuOpen ? "close" : "menu"} 
              size={24} 
              color="#FFFFFF" 
            />
          </Pressable>

          {menuOpen && (
            <Animated.View 
              entering={FadeInDown.duration(300)}
              style={styles.mobileMenu}
            >
              <Link href={routes.screens.pricing} asChild>
                <Pressable style={styles.mobileLink}>
                  <Text style={styles.mobileLinkText}>Pricing</Text>
                </Pressable>
              </Link>
              <Link href={routes.screens.resources} asChild>
                <Pressable style={styles.mobileLink}>
                  <Text style={styles.mobileLinkText}>Resources</Text>
                </Pressable>
              </Link>
              <Link href={routes.screens.contact} asChild>
                <Pressable style={styles.mobileLink}>
                  <Text style={styles.mobileLinkText}>Contact</Text>
                </Pressable>
              </Link>
              <Link href="/login" asChild>
                <Pressable style={styles.mobileLoginButton}>
                  <Text style={styles.loginText}>Login</Text>
                </Pressable>
              </Link>
            </Animated.View>
          )}
        </View>
      ) : (
        <View style={styles.links}>
          <Link href={routes.screens.pricing} asChild>
            <Pressable style={styles.link}>
              <Text style={styles.linkText}>Pricing</Text>
            </Pressable>
          </Link>
          <Link href={routes.screens.resources} asChild>
            <Pressable style={styles.link}>
              <Text style={styles.linkText}>Resources</Text>
            </Pressable>
          </Link>
          <Link href={routes.screens.contact} asChild>
            <Pressable style={styles.link}>
              <Text style={styles.linkText}>Contact</Text>
            </Pressable>
          </Link>
          <Link href="/login" asChild>
            <Pressable style={styles.loginButton}>
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
          </Link>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0A0B1E',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1B3E',
    zIndex: 100,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 32,
    height: 32,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  link: {
    padding: 8,
  },
  linkText: {
    fontSize: 16,
    color: '#5DADE2',
  },
  loginButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  // Mobile styles
  mobileNav: {
    position: 'relative',
  },
  menuButton: {
    padding: 8,
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#16213E',
    padding: 16,
    borderRadius: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  mobileLink: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1B3E',
  },
  mobileLinkText: {
    fontSize: 16,
    color: '#5DADE2',
  },
  mobileLoginButton: {
    backgroundColor: '#3498DB',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
});