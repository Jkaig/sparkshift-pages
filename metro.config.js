const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true
});

// Add support for expo-router and web platform
config.resolver.assetExts.push('cjs');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'cjs'];

// Configure asset resolution
config.resolver.assetExts = [
  ...config.resolver.assetExts,
  'png',
  'jpg',
  'jpeg',
  'gif',
  'webp',
  'ttf',
  'otf',
  'woff',
  'woff2'
];

// Add polyfills and asset directories
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'process': require.resolve('process/browser'),
  'buffer': require.resolve('buffer'),
  'crypto': require.resolve('crypto-browserify'),
  'stream': require.resolve('stream-browserify'),
  'assets': path.resolve(__dirname, './assets'),
};

// Add the assets directory to the watchFolders
config.watchFolders = [
  ...(config.watchFolders || []),
  path.resolve(__dirname, './assets'),
  path.resolve(__dirname, './polyfills'),
];

module.exports = config;