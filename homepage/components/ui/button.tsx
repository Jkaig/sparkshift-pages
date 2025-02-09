import React, { forwardRef } from 'react';
import { Pressable, View, StyleSheet, PressableProps } from 'react-native';

export interface ButtonProps extends PressableProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
}

export const Button = forwardRef<View, ButtonProps>(
  ({ variant = 'default', size = 'default', children, style, ...props }, ref) => {
    const variantStyles = {
      default: styles.default,
      destructive: styles.destructive,
      outline: styles.outline,
      secondary: styles.secondary,
      ghost: styles.ghost,
      link: styles.link,
    };

    const sizeStyles = {
      default: {},
      sm: styles.small,
      lg: styles.large,
      icon: styles.icon,
    };

    return (
      <Pressable
        ref={ref}
        style={[
          styles.base,
          variantStyles[variant],
          sizeStyles[size],
          style,
        ]}
        {...props}
      >
        {children}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  default: {
    backgroundColor: '#007AFF',
  },
  destructive: {
    backgroundColor: '#FF3B30',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#E5E5EA',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  icon: {
    padding: 8,
    width: 40,
    height: 40,
  },
});
