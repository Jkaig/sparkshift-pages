module.exports = {
  name: process.env.EXPO_PUBLIC_APP_NAME || 'SparkShift',
  slug: 'sparkshift-pages',
  version: process.env.EXPO_PUBLIC_APP_VERSION || '1.0.0',
  orientation: 'portrait',
  icon: './assets/app_icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  updates: {
    fallbackToCacheTimeout: 0,
    checkAutomatically: 'ON_LOAD'
  },
  assetBundlePatterns: [
    "**/*"
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
      backgroundColor: '#ffffff'
    },
    package: 'com.sparkshift.app'
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/app_icon.png',
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
}