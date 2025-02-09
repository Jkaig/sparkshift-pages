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
    publicPath: '/',  // Changed to root path since we're using a custom domain
    filename: '_expo/static/js/[name].[contenthash].js',
    chunkFilename: '_expo/static/js/[name].[contenthash].js'
  };

  // Add .well-known to static files and handle client-side routing
  config.plugins[0].options.patterns = [
    ...(config.plugins[0].options.patterns || []),
    {
      from: '.well-known',
      to: '.well-known'
    },
    {
      from: 'apple-app-site-association',
      to: 'apple-app-site-association'
    },
    {
      from: 'public',
      to: ''
    }
  ];

  // Add CNAME file for custom domain
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'CNAME',
          to: 'CNAME',
          toType: 'file'
        }
      ]
    })
  );

  // Add support for client-side routing
  config.devServer = {
    ...config.devServer,
    historyApiFallback: true,
  };

  return config;
};
