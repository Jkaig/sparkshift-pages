module.exports = {
  plugins: ['@expo/next-adapter/babel'],
  presets: ['@expo/next-adapter/babel'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
