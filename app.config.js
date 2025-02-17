module.exports = {
  name: process.env.EXPO_PUBLIC_APP_NAME || 'SparkShift',
  slug: 'sparkshift',
  version: process.env.EXPO_PUBLIC_APP_VERSION || '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#0A0B1E'
  },
  updates: {
    fallbackToCacheTimeout: 0,
    checkAutomatically: 'ON_LOAD'
  },
  assetBundlePatterns: [
    "assets/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.sparkshift.app',
    config: {
      usesNonExemptEncryption: false
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#0A0B1E'
    },
    package: 'com.sparkshift.app'
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
    output: 'static',
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
    'expo-router',
    'expo-image',
    [
      'expo-updates',
      {
        username: 'sparkshift'
      }
    ]
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
  }
}