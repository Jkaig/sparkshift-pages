const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['@expo/vector-icons']
    }
  }, argv);

  // Customize the config before returning it.
  if (env.mode === 'production') {
    // Production-specific settings
    config.output.publicPath = '/';
  }

  // Add .well-known to static files
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
      from: 'CNAME',
      to: 'CNAME'
    }
  ];

  return config;
};
