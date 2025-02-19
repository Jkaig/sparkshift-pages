const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    assetExts: [
      ...defaultConfig.resolver.assetExts,
      'png',
      'jpg',
      'jpeg',
      'gif',
      'webp',
      'ttf',
      'otf',
      'woff',
      'woff2',
      'eot',
      'svg',
      'mp4',
      'webm',
      'wav',
      'mp3',
      'm4a',
      'cjs'
    ],
    sourceExts: [
      ...defaultConfig.resolver.sourceExts,
      'mjs',
      'cjs',
      'web.js',
      'web.ts',
      'web.jsx',
      'web.tsx'
    ],
    extraNodeModules: {
      'react-native-web': path.resolve(__dirname, 'node_modules/react-native-web'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'process': require.resolve('process/browser'),
      'buffer': require.resolve('buffer'),
      'crypto': require.resolve('crypto-browserify'),
      'stream': require.resolve('stream-browserify'),
      'assets': path.resolve(__dirname, './assets')
    }
  },
  transformer: {
    ...defaultConfig.transformer,
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    minifierConfig: {
      keep_classnames: true,
      keep_fnames: true,
      mangle: {
        keep_classnames: true,
        keep_fnames: true
      }
    }
  },
  watchFolders: [
    ...(defaultConfig.watchFolders || []),
    path.resolve(__dirname, './assets'),
    path.resolve(__dirname, './polyfills')
  ]
};

module.exports = config;