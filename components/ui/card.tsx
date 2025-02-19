import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/lib/theme';

interface CardProps {
  variant?: 'default' | 'elevated' | 'gradient';
  style?: ViewStyle;
  children: React.ReactNode;
}

interface CardSubComponentProps {
  style?: ViewStyle | TextStyle;
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<View, CardSubComponentProps>(({ style, children }, ref) => (
  <View ref={ref} style={[styles.header, style]}>{children}</View>
));

export const CardTitle = React.forwardRef<Text, CardSubComponentProps>(({ style, children }, ref) => (
  <Text ref={ref} style={[styles.title, style]}>{children}</Text>
));

export const CardDescription = React.forwardRef<Text, CardSubComponentProps>(({ style, children }, ref) => (
  <Text ref={ref} style={[styles.description, style]}>{children}</Text>
));

export const CardContent = React.forwardRef<View, CardSubComponentProps>(({ style, children }, ref) => (
  <View ref={ref} style={[styles.content, style]}>{children}</View>
));

export const Card = React.forwardRef<View, CardProps>(({
  variant = 'default',
  style,
  children,
}, ref) => {
  const cardContent = (
    <View
      style={[
        styles.card,
        variant === 'elevated' && styles.elevated,
        style,
      ]}
    >
      {children}
    </View>
  );

  if (variant === 'gradient') {
    return (
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        {cardContent}
      </LinearGradient>
    );
  }

  return cardContent;
});

const styles = StyleSheet.create({
  header: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text.light,
  },
  description: {
    fontSize: 14,
    color: theme.colors.text.secondaryLight,
    marginTop: 4,
  },
  content: {
    padding: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  elevated: {
    ...theme.shadows.lg,
    backgroundColor: theme.colors.background.card,
  },
  gradientContainer: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
});

Card.displayName = 'Card';