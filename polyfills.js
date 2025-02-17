// Polyfill for requestAnimationFrame
if (typeof requestAnimationFrame === 'undefined') {
  global.requestAnimationFrame = function(callback) {
    return setTimeout(callback, 0);
  };
}

if (typeof cancelAnimationFrame === 'undefined') {
  global.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };
}

// Other polyfills can be added here as needed
