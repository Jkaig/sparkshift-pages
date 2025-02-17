module.exports = function requestAnimationFrame(callback) {
  if (typeof window !== 'undefined') {
    return window.setTimeout(callback, 1000 / 60);
  }
  return setTimeout(callback, 1000 / 60);
};
