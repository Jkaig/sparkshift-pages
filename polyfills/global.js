if (typeof global !== 'undefined') {
  global.requestAnimationFrame = require('./requestAnimationFrame');
  global.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };
}
