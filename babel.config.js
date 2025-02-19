module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      ['@babel/plugin-transform-runtime', {
        useESModules: true,
      }],
      ['module-resolver', {
        root: ['.'],
        alias: {
          '@': '.',
          'app': './app',
          'react-native-web': './node_modules/react-native-web',
            'react-native': 'react-native-web'
          },
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
        },
      ],
      '@babel/plugin-transform-flow-strip-types',
      ['@babel/plugin-transform-private-methods', { loose: true }],
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-private-property-in-object', { loose: true }],
      ['@babel/plugin-proposal-decorators', { legacy: true }]
    ],
  };
};