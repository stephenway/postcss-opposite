var fs = require('fs');
var test = require('tape');
var postcss = require('postcss');
var pvars = require('postcss-simple-vars');
var plugin = require('..');

function filename(name) { return 'test/' + name + '.css'; }
function read(name) { return fs.readFileSync(name, 'utf8'); }

function compareFixtures(t, name, msg, opts, postcssOpts) {
  postcssOpts = postcssOpts || {};
  postcssOpts.from = filename('fixtures/' + name);
  opts = opts || {};
  var actual = postcss().use(pvars,plugin(opts)).process(read(postcssOpts.from), postcssOpts).css;
  var expected = read(filename('fixtures/' + name + '.expected'));
  fs.writeFile(filename('fixtures/' + name + '.actual'), actual);
  t.equal(actual, expected, msg);
}

test('positions', function(t) {
  compareFixtures(t, 'positions', 'should transform positions');
  t.end();
});

test('rules', function(t) {
  compareFixtures(t, 'rules', 'should transform rule positions');
  t.end();
});

