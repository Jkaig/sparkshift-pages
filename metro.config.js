// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable CSS support
config.transformer.unstable_allowRequireContext = true;
config.resolver.sourceExts.push('mjs', 'cjs');

module.exports = config;
