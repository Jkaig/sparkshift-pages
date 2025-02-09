import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

export interface LabelProps {
  children: React.ReactNode;
  style?: TextStyle;
  htmlFor?: string;
}

export function Label({ children, style, ...props }: LabelProps) {
  return (
    <Text style={[styles.label, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A202C',
    marginBottom: 4,
  },
});
