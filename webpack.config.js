/**
 * Improved webpack.config.js for Expo/React Native Web
 *
 * This configuration uses Expo’s default config as a base, then enhances it by:
 *  • Resolving your app directory and setting up module aliases
 *  • Injecting polyfills for Buffer, process, crypto, and stream for browser support
 *  • Defining key environment variables for your app via DefinePlugin
 *  • Configuring module resolution settings for robust asset loading
 */

const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const webpack = require('webpack');
const path = require('path');

module.exports = async function (env, argv) {
  // Resolve the app directory
  const appPath = path.resolve(__dirname, 'app');

  // Generate the default Expo webpack config
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Enhance module resolution settings:
  // - Define aliases for react-native modules to be redirected to their web equivalents
  // - Add custom module resolution paths
  // - Set fallbacks for node-specific modules used in the browser
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      'react-native': 'react-native-web',
      'react-native-web': path.resolve(__dirname, 'node_modules/react-native-web'),
      'react-native/Libraries/UTFSequence': 'react-native-web/dist/vendor/react-native/UTFSequence',
      'react-native/Libraries/Core/Devtools/parseErrorStack': 'react-native-web/dist/vendor/react-native/parseErrorStack',
      'react-native/Libraries/Image/AssetRegistry': 'react-native-web/dist/vendor/react-native/AssetRegistry',
      'app': appPath,
      '@app': appPath,
      '@/*': path.resolve(__dirname)
    },
    modules: ['node_modules', appPath],
    fallback: {
      ...config.resolve.fallback,
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      process: require.resolve('process/browser')
    },
    extensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.js', '.jsx', '.ts', '.tsx']
  };

  // Inject polyfills for Buffer and process globally
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    })
  );

  // Define environment variables for your application.
  // Adjust or add additional keys as needed by your project.
  config.plugins.push(
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production' || true,
      'process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET),
      'process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
      'process.env.EXPO_PUBLIC_FIREBASE_APP_ID': JSON.stringify(process.env.EXPO_PUBLIC_FIREBASE_APP_ID),
      'process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID),
      'process.env.OPENAI_API_KEY': JSON.stringify(process.env.OPENAI_API_KEY),
      'process.env.EXPO_PUBLIC_OPENAI_API_KEY': JSON.stringify(process.env.EXPO_PUBLIC_OPENAI_API_KEY)
    })
  );

  // Optionally, you can extend this configuration with additional rules or plugins as needed
  // For example, add custom asset loading rules or optimization plugins

  return config;
};