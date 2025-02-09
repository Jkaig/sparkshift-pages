import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';

interface BadgeProps extends ViewProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  children: React.ReactNode;
}

export function Badge({ 
  variant = 'default',
  style,
  children,
  ...props 
}: BadgeProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'destructive':
        return styles.destructive;
      case 'outline':
        return styles.outline;
      default:
        return styles.default;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineText;
      default:
        return styles.text;
    }
  };

  return (
    <View style={[styles.base, getVariantStyle(), style]} {...props}>
      <Text style={getTextStyle()}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#E5E5EA',
  },
  destructive: {
    backgroundColor: '#EF4444',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  outlineText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '500',
  },
});
