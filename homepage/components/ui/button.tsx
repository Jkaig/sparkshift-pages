import React, { forwardRef } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('', {
  variants: {
    variant: {
      default: 'primary',
      destructive: 'destructive',
      outline: 'outline',
      secondary: 'secondary',
      ghost: 'ghost',
      link: 'link',
    },
    size: {
      default: 'default',
      sm: 'small',
      lg: 'large',
      icon: 'icon',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

interface ButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable>,
  VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const Button = forwardRef<View, ButtonProps>(
  ({ variant, size, children, style, ...props }, ref) => {
    const baseStyles = [
      styles.base,
      variant === 'default' && styles.default,
      variant === 'destructive' && styles.destructive,
      variant === 'outline' && styles.outline,
      variant === 'secondary' && styles.secondary,
      variant === 'ghost' && styles.ghost,
      variant === 'link' && styles.link,
      size === 'sm' && styles.small,
      size === 'lg' && styles.large,
      size === 'icon' && styles.icon,
    ];

    return (
      <Pressable
        style={style ? [StyleSheet.flatten(baseStyles), style] : StyleSheet.flatten(baseStyles)}
        ref={ref}
        {...props}
      >
        {children}
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  default: {
    backgroundColor: '#0070f3',
  },
  destructive: {
    backgroundColor: '#ff4444',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  secondary: {
    backgroundColor: '#f3f4f6',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
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
    width: 40,
    height: 40,
    padding: 0,
  },
});

Button.displayName = 'Button';

export { Button, buttonVariants, type ButtonProps };
