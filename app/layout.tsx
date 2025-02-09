import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeProvider } from '../components/theme-provider';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Navbar />
        <View style={styles.main}>
          {children}
        </View>
        <Footer />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  main: {
    flex: 1,
    padding: 16,
  },
});
