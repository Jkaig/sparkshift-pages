const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['@expo/vector-icons']
    }
  }, argv);

  // Customize the config before returning it.
  config.output = {
    ...config.output,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '_expo/static/js/[name].[contenthash].js',
    chunkFilename: '_expo/static/js/[name].[contenthash].js'
  };

  // Add browser targets for better compatibility
  config.target = ['web', 'es5'];

  // Add polyfills for Safari
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "buffer": require.resolve("buffer/")
  };

  // Configure dev server
  config.devServer = {
    ...config.devServer,
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/'
    },
    historyApiFallback: true,
    hot: true,
    compress: true
  };

  // Copy static files
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist')
        },
        {
          from: '.well-known',
          to: '.well-known'
        },
        {
          from: 'apple-app-site-association',
          to: 'apple-app-site-association'
        }
      ]
    })
  );

  return config;
};
