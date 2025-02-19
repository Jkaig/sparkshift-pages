const { withExpo } = require('@expo/next-adapter');

module.exports = withExpo({
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: '/',
  webpack: (config, { isServer }) => {
    // Handle fonts
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[hash][ext][query]',
      },
    });

    // Handle images
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|svg)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash:8][ext]'
      }
    });

    // Configure module resolution
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      'react-native-web': require.resolve('react-native-web'),
      '@react-native': 'react-native-web',
      'expo-asset': require.resolve('./src/mocks/empty.js')
    };

    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...(config.resolve.extensions || [])
    ];

    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify')
    };

    return config;
  },
  transpilePackages: [
    'react-native',
    'expo',
    'expo-router',
    '@expo/vector-icons',
    'react-native-web',
    'react-native-reanimated',
    'react-native-gesture-handler',
    'react-native-safe-area-context',
    'react-native-screens',
    '@react-navigation/native',
    '@react-navigation/elements',
  ],
});
