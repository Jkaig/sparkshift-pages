import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '@/lib/theme';

type LoadingProps = {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const sizeMap = {
  sm: 'small',
  md: 'large',
  lg: 'large'
} as const;

export function Loading({ size = 'md', text, fullScreen }: LoadingProps) {
  const containerStyle = [
    styles.container,
    fullScreen && styles.fullScreen,
  ];

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={sizeMap[size]} color={theme.colors.primary.main} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
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
  text: {
    marginTop: 12,
    fontSize: 16,
    color: theme.colors.text.light,
    textAlign: 'center',
  },
});