#!/usr/bin/env node
'use strict';

exports.__esModule = true;
exports.makeFilename = makeFilename;
exports.handlePath = handlePath;
exports.getArgv = getArgv;
exports.getSVGOOpts = getSVGOOpts;
exports.getLoaderContext = getLoaderContext;
exports.run = run;

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash.isplainobject');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeFilename(filename) {
  return filename + '.react.js';
}

function handlePath(configFile) {
  switch (_path2.default.extname(configFile)) {
    case '.yaml':
      return _jsYaml2.default.safeLoad(_fs2.default.readFileSync(configFile));
    case '.json':
    case '.js':
      return require(_path2.default.join(process.cwd(), configFile));
    default:
      throw new Error('Unsupported config file format.');
  }
}

function getArgv() {
  return _yargs2.default.usage('Usage: $0 [files] [options]').option('5', {
    alias: 'es5',
    describe: 'Use babel presets es2015 and react',
    boolean: true,
    default: false
  }).option('0', {
    alias: 'stdout',
    describe: 'Print output to stdout',
    boolean: true,
    default: 'false'
  })
  // svgo options
  .option('svgo', {
    describe: 'Path to YAML or JS or JSON config file for SVGO'
  }).demand(1).version(require('../package.json').version).help('h').alias('h', 'help').argv;
}

function getSVGOOpts(argv) {
  var svgoOpts = void 0;

  if (typeof argv.svgo === 'string') {
    svgoOpts = handlePath(argv.svgo);
  } else if ((0, _lodash2.default)(argv.svgo)) {
    svgoOpts = argv.svgo;
    if ((0, _lodash2.default)(svgoOpts.plugins) || typeof svgoOpts.plugins === 'string') {
      svgoOpts.plugins = [svgoOpts.plugins];
    }
  }
  return svgoOpts;
}

function getLoaderContext(_ref) {
  var argv = _ref.argv;
  var query = _ref.query;
  var file = _ref.file;

  return {
    query: query,
    cacheable: function cacheable() {},
    addDependency: function addDependency() {},
    async: function async() {
      return function (err, result) {
        /* eslint-disable no-console */
        if (err) return console.error("ERROR ERROR ERROR", file, err.stack);
        if (argv['0']) console.log(result);
        /* eslint-enable */
        else _fs2.default.writeFileSync(makeFilename(file), result);
      };
    }
  };
}

function run() {
  var argv = getArgv();
  var svgoOpts = getSVGOOpts(argv);

  argv._.map(function (file) {
    var source = _fs2.default.readFileSync(file);

    var query = void 0;
    try {
      // serializable check
      query = '?' + JSON.stringify({
        es5: argv.es5,
        svgo: svgoOpts
      });
    } catch (e) {
      /* eslint-disable no-console */
      console.error('The options passed are not serializable.');
      /* eslint-enable */
      process.exit(1);
    }
    _loader2.default.apply(getLoaderContext({ argv: argv, query: query, file: file }), [source]);
  });
}

// for testability
if (require.main === module) {
  run();
}