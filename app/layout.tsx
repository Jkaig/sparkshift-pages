import React from 'react';
import { View, StyleSheet, Platform, ViewStyle } from 'react-native';
import { ThemeProvider } from '../components/theme-provider';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Stack } from 'expo-router';

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'SparkShift',
          }}
        />
      </Stack>
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
    height: Platform.select({ web: '100%', default: '100%' }) as string,
  } as ViewStyle,
  main: {
    flex: 1,
    padding: 16,
  } as ViewStyle,
});
