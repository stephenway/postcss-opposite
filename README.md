# postcss-opposite [![Travis Build Status][travis-img]][travis]

## Install

``` shell
npm i --save-dev postcss-opposite
```

## Usage

```js
var fs = require('fs');
var postcss = require('postcss');
var customProperties = require('postcss-custom-properties');
var opposite = require('postcss-opposite');

var css = fs.readFileSync('input.css', 'utf8');

var output = postcss()
  .use(customProperties())
  .use(opposite())
  .process(css)
  .css;

```

### PostCSS
```css
/* input.css */

body {
}
```

### Compiled CSS
```css
/* output.css */

body {
}
```

## Contributing

Make a branch, `npm test` often, submit a new pull when it passes.

``` shell
git clone https://github.com/stephenway/postcss-opposite.git
git checkout -b patch-1
npm i
npm test
```

## Resources

* [License](LICENSE)
* [Releases](https://github.com/stephenway/postcss-opposite/releases)
* [Plugin Guidelines](https://github.com/postcss/postcss/blob/master/docs/guidelines/plugin.md)

[travis-img]: https://img.shields.io/travis/stephenway/postcss-opposite.svg?label=unix
[travis]: https://travis-ci.org/stephenway/postcss-opposite
