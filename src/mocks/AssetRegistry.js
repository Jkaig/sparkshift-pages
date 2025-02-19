// Mock implementation of AssetRegistry
const assets = new Map();

const registerAsset = (asset) => {
  if (asset.fileSystemLocation && asset.httpServerLocation && asset.name) {
    const key = `${asset.fileSystemLocation}/${asset.name}`;
    assets.set(key, asset);
    return asset;
  }
  return asset;
};

const getAssetByID = (assetId) => {
  return assets.get(assetId) || null;
};

module.exports = {
  registerAsset,
  getAssetByID,
};
