// Mock implementation of normalize-colors
const normalizeColor = (color) => {
  if (typeof color === 'number') {
    return color;
  }
  return color;
};

module.exports = normalizeColor;
