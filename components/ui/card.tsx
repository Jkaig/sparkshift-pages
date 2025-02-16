import * as React from "react"
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { cn } from "@/lib/utils"

export interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
}

export interface CardTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
  className?: string;
}

export interface CardDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
  className?: string;
}

export interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
}

export const Card = React.forwardRef<View, CardProps>(({ className, style, children, ...props }, ref) => (
  <View
    ref={ref}
    style={[styles.card, style]}
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
    {...props}
  >
    {children}
  </View>
))
Card.displayName = "Card"

export const CardHeader = React.forwardRef<View, CardHeaderProps>(({ className, style, children, ...props }, ref) => (
  <View
    ref={ref}
    style={[styles.header, style]}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  >
    {children}
  </View>
))
CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef<Text, CardTitleProps>(({ className, style, children, ...props }, ref) => (
  <Text
    ref={ref}
    style={[styles.title, style]}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  >
    {children}
  </Text>
))
CardTitle.displayName = "CardTitle"

export const CardDescription = React.forwardRef<Text, CardDescriptionProps>(({ className, style, children, ...props }, ref) => (
  <Text
    ref={ref}
    style={[styles.description, style]}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  >
    {children}
  </Text>
))
CardDescription.displayName = "CardDescription"

export const CardContent = React.forwardRef<View, CardContentProps>(({ className, style, children, ...props }, ref) => (
  <View
    ref={ref}
    style={[styles.content, style]}
    className={cn("p-6 pt-0", className)}
    {...props}
  >
    {children}
  </View>
))
CardContent.displayName = "CardContent"

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 8,
  },
  content: {
    marginTop: 8,
  },
});
