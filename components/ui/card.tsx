import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';
import { theme } from '@/lib/theme';

interface CardProps {
  variant?: 'default' | 'elevated' | 'gradient';
  style?: ViewStyle;
  children: React.ReactNode;
}

export const Card = React.forwardRef<View, CardProps>(({
  variant = 'default',
  style,
  children,
}, ref) => {
  const cardContent = (
    <Animated.View
      entering={FadeIn.duration(400)}
      style={[
        styles.card,
        variant === 'elevated' && styles.elevated,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );

  if (variant === 'gradient') {
    return (
      <LinearGradient
        colors={theme.colors.background.gradient}
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