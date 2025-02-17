import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { routes } from '../lib/routes';
import { Ionicons } from '@expo/vector-icons';
import { BRAND } from '../app/constants';

export function Navbar() {
  const { width } = useWindowDimensions();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = width < 768;

  return (
    <View style={styles.navbar}>
      <Link href={routes.screens.home} asChild>
        <Pressable style={styles.logoContainer}>
          <Ionicons name="flash" size={32} color="#3498DB" />
          <Text style={styles.logoText}>{BRAND.NAME}</Text>
        </Pressable>
      </Link>

      {isMobile ? (
        <Pressable onPress={() => setMenuOpen(!menuOpen)} style={styles.menuButton}>
          <Ionicons name={menuOpen ? "close" : "menu"} size={24} color="black" />
        </Pressable>
      ) : (
        <View style={styles.navLinks}>
          <Link href={routes.screens.home} asChild>
            <Pressable style={styles.navLink}>
              <Text style={styles.navLinkText}>Home</Text>
            </Pressable>
          </Link>
          <Link href={routes.screens.about} asChild>
            <Pressable style={styles.navLink}>
              <Text style={styles.navLinkText}>About</Text>
            </Pressable>
          </Link>
          <Link href={routes.screens.contact} asChild>
            <Pressable style={styles.navLink}>
              <Text style={styles.navLinkText}>Contact</Text>
            </Pressable>
          </Link>
        </View>
      )}

      {isMobile && menuOpen && (
        <View style={styles.mobileMenu}>
          <Link href={routes.screens.home} asChild>
            <Pressable style={styles.mobileNavLink}>
              <Text style={styles.mobileNavLinkText}>Home</Text>
            </Pressable>
          </Link>
          <Link href={routes.screens.about} asChild>
            <Pressable style={styles.mobileNavLink}>
              <Text style={styles.mobileNavLinkText}>About</Text>
            </Pressable>
          </Link>
          <Link href={routes.screens.contact} asChild>
            <Pressable style={styles.mobileNavLink}>
              <Text style={styles.mobileNavLinkText}>Contact</Text>
            </Pressable>
          </Link>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 32,
    height: 32,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  navLinks: {
    flexDirection: 'row',
    gap: 24,
  },
  navLink: {
    padding: 8,
  },
  navLinkText: {
    fontSize: 16,
  },
  menuButton: {
    padding: 8,
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    padding: 16,
  },
  mobileNavLink: {
    padding: 12,
  },
  mobileNavLinkText: {
    fontSize: 16,
  },
});