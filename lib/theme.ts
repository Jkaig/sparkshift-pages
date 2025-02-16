export const theme = {
  colors: {
    // Primary Colors
    primary: {
      main: '#0A0B1E',      // Deep Navy Blue
      light: '#5DADE2',     // Sky Blue
      default: '#3498DB',   // Bright Blue
      dark: '#154360',      // Deep Blue
    },
    // Secondary Colors
    secondary: {
      main: '#A93226',      // Deep Red
      light: '#EB984E',     // Soft Orange
    },
    // Background Colors
    background: {
      main: '#0A0B1E',      // Deep Navy
      card: '#16213E',      // Slightly Lighter Navy
      secondary: '#1A1B3E', // Navy Blue
      light: '#F5F6FA',     // Off-White
      dialog: '#16213E',    // Navy Blue
    },
    // Text Colors
    text: {
      dark: '#2C3E50',      // Deep Grey
      light: '#FFFFFF',     // Pure White
      secondaryDark: '#555555', // Medium Grey
      secondaryLight: '#AAAAAA', // Light Grey
    },
    // Accent Colors
    accent: {
      red: '#E74C3C',       // Bright Red
      blue: '#3498DB',      // Bright Blue
    },
    // Border Colors
    border: '#3A3B5E',      // Muted Blue-Grey
    // Status Colors
    success: '#059669',     // Green
    error: '#dc2626',       // Red
    warning: '#f59e0b',     // Amber
    info: '#3b82f6',        // Blue
  },
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  // Border Radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  // Typography
  typography: {
    fontFamily: {
      sans: 'System',
      mono: 'Menlo',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  // Shadows
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
  },
  // Gradients
  gradients: {
    primary: ['#0A0B1E', '#16213E'],
    accent: ['#3498DB', '#5DADE2'],
    success: ['#059669', '#34D399'],
    error: ['#dc2626', '#ef4444'],
  },
};

export type Theme = typeof theme;