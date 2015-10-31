// jscs:disable validateQuoteMarks

'use strict';

var postcss = require('postcss');

/**
 * PostCSS plugin to transform opposite-position()
 */
module.exports = postcss.plugin('postcss-opposite', function(opts) {
  opts = opts || {};

  return function(css) {
    css.walkDecls(function(decl) {
      if (!decl.value || decl.value.indexOf('opposite(') === -1) {
        return;
      }
      function unquote(str, quoteChar) {
        quoteChar = quoteChar || '"';
        if (str[0] === quoteChar && str[str.length - 1] === quoteChar) {
          return str.slice(1, str.length - 1);
        }
        else {
          return str;
        }
      }

      var index = decl.value.indexOf('(');
      var last = decl.value.indexOf(')');
      var directions = decl.value.slice(++index, last);
      var oppositeDirections;
      var oppositeDirectionsF;
      var directionMap = new Map();
      directionMap.set('top', 'bottom');
      directionMap.set('right', 'left');
      directionMap.set('bottom', 'top');
      directionMap.set('left', 'right');
      directionMap.set('center', 'center');
      directionMap.set('ltr', 'rtl');
      directionMap.set('rtl', 'ltr');

      return new Promise(function(resolve) {
        for (var direction in directions) {
          var directionL = direction.toLowerCase();

          if (directionMap.has(directionL)) {
            oppositeDirectionsF = oppositeDirections.appendChild(unquote(directionMap.get(directionL), "'"));
          }
          else {
            console.log('No opposite direction can be found for $(direction). Direction omitted.');
          }
        }

        decl.value = oppositeDirectionsF;
        resolve();
      });
    });
  };
});

