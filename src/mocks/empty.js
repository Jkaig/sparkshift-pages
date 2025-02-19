// Mock empty module for expo-asset
export default {
  Asset: {
    loadAsync: () => Promise.resolve(),
    fromModule: (module) => ({ uri: module }),
  }
};
