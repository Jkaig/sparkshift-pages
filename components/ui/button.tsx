import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  View,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/lib/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

export const Button = React.forwardRef<any, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onPress,
  style,
  textStyle,
  children,
}, ref) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const animatedScale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.timing(animatedScale, {
      toValue: 0.95,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.timing(animatedScale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const getGradientColors = (): [string, string] => {
    switch (variant) {
      case 'primary':
        return [theme.colors.primary.gradient[0], theme.colors.primary.gradient[1]];
      case 'secondary':
        return [theme.colors.secondary.gradient[0], theme.colors.secondary.gradient[1]];
      default:
        return ['#4F46E5', '#7C3AED']; // Default gradient colors
    }
  };

  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  type TextStyleVariants =
    | 'text'
    | 'textPrimary'
    | 'textSecondary'
    | 'textOutline'
    | 'textGhost'
    | 'textDestructive';

  const textStyles = [
    styles.text,
    styles[(`text${variant.charAt(0).toUpperCase() + variant.slice(1)}`) as TextStyleVariants],
    textStyle,
  ];

  const gradientColors = getGradientColors();

  const content = (
    <>
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary.main : '#fff'} />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={textStyles}>{children}</Text>
          {icon && iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
        </View>
      )}
    </>
  );

  return (
    <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
      <Pressable
        ref={ref}
        style={buttonStyle}
        onPress={onPress}
        disabled={disabled || loading}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {variant === 'primary' || variant === 'secondary' ? (
          <LinearGradient colors={gradientColors} style={styles.gradient}>
            {content}
          </LinearGradient>
        ) : (
          content
        )}
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  primary: {
    backgroundColor: theme.colors.primary.main,
  },
  secondary: {
    backgroundColor: theme.colors.secondary.main,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary.main,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  destructive: {
    backgroundColor: '#DC2626',
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  md: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  lg: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  textPrimary: {
    color: '#ffffff',
  },
  textSecondary: {
    color: '#ffffff',
  },
  textOutline: {
    color: theme.colors.primary.main,
  },
  textGhost: {
    color: theme.colors.primary.main,
  },
  textDestructive: {
    color: '#ffffff',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
    marginRight: 0,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
});

Button.displayName = 'Button';