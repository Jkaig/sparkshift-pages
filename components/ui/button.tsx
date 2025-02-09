import React from 'react';
import { Pressable, Text, StyleSheet, PressableProps, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps extends PressableProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  asChild?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children,
  style,
  textStyle,
  onPress,
  type = 'button',
  className,
  asChild,
  ...props 
}: ButtonProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'outline':
        return styles.outline;
      default:
        return styles.primary;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return styles.small;
      case 'lg':
        return styles.large;
      default:
        return styles.medium;
    }
  };

  const combinedStyle = [
    styles.base,
    getVariantStyle(),
    getSizeStyle(),
    style as ViewStyle,
  ];

  return (
    <Pressable
      style={combinedStyle}
      onPress={onPress}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text style={[
          styles.text,
          variant === 'outline' && styles.outlineText,
          textStyle
        ]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#E5E5EA',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineText: {
    color: '#007AFF',
  },
});
