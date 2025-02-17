// Global polyfills for React Native Web and Reanimated
if (typeof global !== 'undefined') {
  // Animation frame polyfills
  global.requestAnimationFrame = function(callback) {
    return setTimeout(callback, 1000 / 60);
  };
  
  global.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };

  // Reanimated worklet polyfills
  global.__reanimatedWorkletInit = function() {};
  global._WORKLET = false;
  global._log = console.log;
  global._warn = console.warn;
  global._error = console.error;

  // Performance polyfill
  if (typeof performance === 'undefined') {
    global.performance = {
      now: () => Date.now()
    };
  }
}