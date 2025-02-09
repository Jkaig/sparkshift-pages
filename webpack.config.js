const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Add .well-known to static files
  config.plugins[0].options.patterns = [
    ...config.plugins[0].options.patterns,
    {
      from: '.well-known',
      to: '.well-known'
    },
    {
      from: 'apple-app-site-association',
      to: 'apple-app-site-association'
    }
  ];

  // Customize the config before returning it.
  config.output = {
    ...config.output,
    publicPath: '/'
  };

  // Add support for importing .web.js files
  config.resolve.extensions = [
    '.web.js',
    '.js',
    '.jsx',
    '.json',
    '.tsx',
    '.ts',
    '.native.js'
  ];

  return config;
};
