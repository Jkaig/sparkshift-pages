const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname, {
  // Enable CSS support
  isCSSEnabled: true
});

// Add support for expo-router and web platform
config.resolver.assetExts.push('cjs');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'cjs'];

// Ensure proper MIME types for web
config.transformer = {
  ...config.transformer,
  minifierPath: require.resolve('metro-minify-terser'),
  minifierConfig: {
    // Ensure proper MIME type for JavaScript files
    ecma: 8,
    keep_classnames: true,
    keep_fnames: true,
    module: true,
    mangle: {
      keep_classnames: true,
      keep_fnames: true
    }
  }
};

module.exports = config;