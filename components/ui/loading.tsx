import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { theme } from '@/lib/theme';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export function Loading({ size = 'md', text, fullScreen }: LoadingProps) {
  const containerStyle = [
    styles.container,
    fullScreen && styles.fullScreen,
  ];

  const spinnerSize = {
    sm: 24,
    md: 32,
    lg: 48,
  }[size];

  return (
    <Animated.View 
      entering={FadeIn.duration(300)}
      style={containerStyle}
    >
      <View style={[styles.spinner, { width: spinnerSize, height: spinnerSize }]}>
        <Animated.View 
          style={styles.spinnerInner}
        />
      </View>
      {text && <Text style={styles.text}>{text}</Text>}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  spinner: {
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: theme.colors.primary.light,
    borderTopColor: 'transparent',
    animation: 'spin 1s linear infinite',
  },
  spinnerInner: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: theme.colors.primary.main,
    borderTopColor: 'transparent',
    animation: 'spin 0.5s linear infinite reverse',
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: theme.colors.text.light,
    textAlign: 'center',
  },
});