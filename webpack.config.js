const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');
const webpack = require('webpack');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: [
        '@expo/vector-icons',
        'expo-router',
        'react-native-reanimated'
      ]
    }
  }, argv);

  // Add polyfills
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "buffer": require.resolve("buffer/"),
    "process": require.resolve("process/browser"),
  };

  // Configure module resolution
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname),
    'app': path.resolve(__dirname, 'app')
  };

  // Add entry point for polyfills
  const originalEntry = config.entry;
  config.entry = async () => {
    const entries = await originalEntry();
    return {
      ...entries,
      main: [
        path.resolve(__dirname, 'polyfills.js'),
        ...([].concat(entries.main || [])),
      ],
    };
  };

  // Add plugins
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      __DEV__: process.env.NODE_ENV !== 'production' || true,
      window: 'global',
      'global.performance': 'performance',
    })
  );

  return config;
};