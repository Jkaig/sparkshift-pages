const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname, {
  // Enable CSS support
  isCSSEnabled: true
});

// Add support for expo-router and web platform
config.resolver.assetExts.push('cjs');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'cjs'];

// Add polyfills to the Metro bundler
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'requestAnimationFrame': path.resolve(__dirname, './polyfills/requestAnimationFrame.js'),
};

// Add the polyfills directory to the watchFolders
config.watchFolders = [
  ...(config.watchFolders || []),
  path.resolve(__dirname, './polyfills'),
];

module.exports = config;