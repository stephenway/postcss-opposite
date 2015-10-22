'use strict';

var postcss = require('postcss');

/**
 * PostCSS plugin to transform opposite-position()
 */
module.exports = postcss.plugin('postcss-opposite-position', function(opts) {
  opts = opts || {};

  return function(css) {
    css.walkDecls(function(decl) {
      if (!decl.value || decl.value.indexOf('opposite-position(') === -1) {
        return;
      }

      var index = decl.value.indexOf('(');
      var last = decl.value.indexOf(')');
      var value = decl.value.slice(++index, last);
      var position;

      return new Promise(function(resolve) {
        if (value === 'top') {
          position = 'bottom';
        }
        else if (value === 'right') {
          position = 'left';
        }
        else if (value === 'bottom') {
          position = 'top';
        }
        else if (value === 'left') {
          position = 'right';
        }
        else if (value === 'center') {
          position = 'center';
        }
        else if (value === 'top left') {
          position = 'bottom right';
        }
        else if (value === 'top right') {
          position = 'bottom left';
        }
        else if (value === 'center right') {
          position = 'center left';
        }
        else if (value === 'center left') {
          position = 'center right';
        }
        else if (value === 'bottom right') {
          position = 'top left';
        }
        else if (value === 'bottom left') {
          position = 'top right';
        }
        decl.value = position;
        resolve();
      });
    });
  };
});

