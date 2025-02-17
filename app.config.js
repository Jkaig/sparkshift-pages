module.exports = {
  name: process.env.EXPO_PUBLIC_APP_NAME || 'SparkShift',
  slug: 'sparkshift-pages',
  version: process.env.EXPO_PUBLIC_APP_VERSION || '1.0.0',
  orientation: 'portrait',
  icon: 'https://placehold.co/1024x1024?text=SparkShift',
  userInterfaceStyle: 'light',
  splash: {
    image: 'https://placehold.co/2048x2048?text=SparkShift',
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
      foregroundImage: 'https://placehold.co/1024x1024?text=SparkShift',
      backgroundColor: '#0A0B1E'
    },
    package: 'com.sparkshift.app'
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: 'https://placehold.co/32x32?text=S',
    name: 'SparkShift - #1 Electrical Exam Prep Platform',
    description: 'Master your electrical certification exam with SparkShift\'s AI-powered practice tests, real-time analytics, and personalized study plans.',
    themeColor: '#0A0B1E',
    backgroundColor: '#0A0B1E',
    metaTags: {
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'mobile-web-app-capable': 'yes'
    }
  },
  plugins: [
    'expo-router'
  ],
  extra: {
    eas: {
      projectId: 'pmd_1QtHhpE49mJZ8uqofMNvKYou'
    }
  },
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
        config: {
          organization: "sparkshift",
          project: "sparkshift-app"
        }
      }
    ]
  },
  scheme: 'sparkshift',
  experiments: {
    tsconfigPaths: true
  }
};