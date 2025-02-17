const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['@expo/vector-icons', 'expo-router']
    }
  }, argv);

  // Customize the config before returning it.
  config.output = {
    ...config.output,
    path: path.resolve(__dirname, 'web-build'),
    publicPath: '/',
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js'
  };

  // Add browser targets for better compatibility
  config.target = ['web', 'es5'];

  // Add polyfills for Safari
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "buffer": require.resolve("buffer/"),
    "requestAnimationFrame": require.resolve("raf/polyfill"),
    "cancelAnimationFrame": require.resolve("raf/polyfill"),
  };

  // Configure module resolution
  config.resolve = {
    ...config.resolve,
    modules: [
      path.resolve(__dirname, '.'),
      path.resolve(__dirname, 'node_modules'),
      'node_modules'
    ],
    alias: {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      'app': path.resolve(__dirname, 'app')
    }
  };

  // Configure dev server
  config.devServer = {
    ...config.devServer,
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/'
    },
    historyApiFallback: true,
    hot: true,
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  };

  // Add plugins
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      __DEV__: process.env.NODE_ENV !== 'production' || true,
    })
  );

  // Add entry point for polyfills
  const originalEntry = config.entry;
  config.entry = async () => {
    const entries = await originalEntry();
    return {
      ...entries,
      main: [
        path.resolve(__dirname, 'polyfills.js'),
        path.resolve(__dirname, 'polyfills/global.js'),
        ...([].concat(entries.main || [])),
      ],
    };
  };

  return config;
};