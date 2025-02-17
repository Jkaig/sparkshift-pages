// Polyfills for React Native Web and Reanimated
if (typeof global !== 'undefined') {
  // Animation frame polyfills
  global.requestAnimationFrame = function(callback) {
    return setTimeout(callback, 1000 / 60);
  };
  
  global.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };

  // Performance polyfill
  if (typeof performance === 'undefined') {
    global.performance = {
      now: () => Date.now()
    };
  }

  // Process polyfill
  if (typeof process === 'undefined') {
    global.process = require('process');
  }
}