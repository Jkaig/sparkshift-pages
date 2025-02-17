// Update theme with enhanced colors and animations
export const theme = {
  colors: {
    primary: {
      main: '#0A0B1E',      // Deep Navy Blue
      light: '#5DADE2',     // Sky Blue
      default: '#3498DB',   // Bright Blue
      dark: '#154360',      // Deep Blue
      gradient: ['#3498DB', '#2980B9'], // Gradient for buttons
    },
    secondary: {
      main: '#A93226',      // Deep Red
      light: '#EB984E',     // Soft Orange
      gradient: ['#EB984E', '#D35400'], // Gradient for secondary elements
    },
    background: {
      main: '#0A0B1E',      // Deep Navy
      card: '#16213E',      // Slightly Lighter Navy
      secondary: '#1A1B3E', // Navy Blue
      light: '#F5F6FA',     // Off-White
      dialog: '#16213E',    // Navy Blue
      gradient: ['#0A0B1E', '#16213E'], // Gradient for backgrounds
    },
    text: {
      dark: '#2C3E50',      // Deep Grey
      light: '#FFFFFF',     // Pure White
      secondaryDark: '#555555', // Medium Grey
      secondaryLight: '#AAAAAA', // Light Grey
      gradient: ['#FFFFFF', '#E0E0E0'], // Gradient for text effects
    },
    accent: {
      success: '#059669',   // Green
      error: '#dc2626',     // Red
      warning: '#f59e0b',   // Amber
      info: '#3b82f6',      // Blue
      gradient: {
        success: ['#059669', '#047857'],
        error: ['#dc2626', '#b91c1c'],
        warning: ['#f59e0b', '#d97706'],
        info: ['#3b82f6', '#2563eb'],
      },
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    pill: 9999,
  },
  typography: {
    fontFamily: {
      sans: 'System',
      mono: 'Menlo',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 32,
      '4xl': 40,
      '5xl': 48,
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
    glow: {
      shadowColor: '#3498DB',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 12,
    },
  },
  animation: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },
  blur: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
};

export type Theme = typeof theme;