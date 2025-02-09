import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'default' | 'destructive';
  children: React.ReactNode;
  className?: string;
}

export function Card({ variant = 'default', style, children, className, ...props }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        variant === 'destructive' && styles.destructive,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

interface CardHeaderProps extends ViewProps {
  children: React.ReactNode;
}

export function CardHeader({ style, children, ...props }: CardHeaderProps) {
  return (
    <View style={[styles.header, style]} {...props}>
      {children}
    </View>
  );
}

interface CardContentProps extends ViewProps {
  children: React.ReactNode;
}

export function CardContent({ style, children, ...props }: CardContentProps) {
  return (
    <View style={[styles.content, style]} {...props}>
      {children}
    </View>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
}

export function CardTitle({ children }: CardTitleProps) {
  return <Text style={styles.title}>{children}</Text>;
}

interface CardDescriptionProps {
  children: React.ReactNode;
}

export function CardDescription({ children }: CardDescriptionProps) {
  return <Text style={styles.description}>{children}</Text>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  destructive: {
    borderColor: '#EF4444',
    borderWidth: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
  },
});
