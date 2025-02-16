import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/lib/hooks/useTheme';

export interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated';
}

export interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export interface CardTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export interface CardDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card = React.forwardRef<View, CardProps>(
  ({ children, style, variant = 'default', ...props }, ref) => {
    const theme = useTheme();
    
    const cardStyles = [
      styles.card,
      {
        backgroundColor: theme.colors.background.card,
        borderRadius: theme.borderRadius.lg,
        ...(variant === 'elevated' ? theme.shadows.md : {}),
      },
      style,
    ];

    return (
      <View ref={ref} style={cardStyles} {...props}>
        {children}
      </View>
    );
  }
);

export const CardHeader = React.forwardRef<View, CardHeaderProps>(
  ({ children, style, ...props }, ref) => {
    const theme = useTheme();
    
    return (
      <View
        ref={ref}
        style={[
          styles.header,
          { padding: theme.spacing.lg },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }
);

export const CardTitle = React.forwardRef<Text, CardTitleProps>(
  ({ children, style, ...props }, ref) => {
    const theme = useTheme();
    
    return (
      <Text
        ref={ref}
        style={[
          styles.title,
          {
            color: theme.colors.text.light,
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.bold,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

export const CardDescription = React.forwardRef<Text, CardDescriptionProps>(
  ({ children, style, ...props }, ref) => {
    const theme = useTheme();
    
    return (
      <Text
        ref={ref}
        style={[
          styles.description,
          {
            color: theme.colors.text.secondaryLight,
            fontSize: theme.typography.fontSize.sm,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

export const CardContent = React.forwardRef<View, CardContentProps>(
  ({ children, style, ...props }, ref) => {
    const theme = useTheme();
    
    return (
      <View
        ref={ref}
        style={[
          styles.content,
          { padding: theme.spacing.lg },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  header: {
    marginBottom: 0,
  },
  title: {
    marginBottom: 4,
  },
  description: {
    marginBottom: 8,
  },
  content: {
    marginTop: 0,
  },
});

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';
CardContent.displayName = 'CardContent';