module.exports = {
  name: process.env.EXPO_PUBLIC_APP_NAME || 'SparkShift',
  slug: 'sparkshift-pages',
  version: process.env.EXPO_PUBLIC_APP_VERSION || '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#0A0B1E'
  },
  assetBundlePatterns: [
    "assets/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.sparkshift.app'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#0A0B1E'
    },
    package: 'com.sparkshift.app'
  },
  web: {
    bundler: 'webpack',
    output: 'static',
    favicon: './assets/favicon.png'
  },
  plugins: [
    'expo-router'
  ],
  extra: {
    eas: {
      projectId: 'pmd_1QtHhpE49mJZ8uqofMNvKYou'
    }
  },
  scheme: 'sparkshift',
  experiments: {
    tsconfigPaths: true
  }
};