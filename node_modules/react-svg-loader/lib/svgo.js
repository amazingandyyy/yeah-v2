'use strict';

exports.__esModule = true;
exports.essentialPlugins = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; // validates svgo opts
// to contain minimal set of plugins that will strip some stuff
// for the babylon JSX parser to work


exports.isEssentialPlugin = isEssentialPlugin;
exports.validateAndFix = validateAndFix;

var _lodash = require('lodash.isplainobject');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var essentialPlugins = exports.essentialPlugins = ['removeDoctype', 'removeComments'];

function isEssentialPlugin(p) {
  return essentialPlugins.indexOf(p) !== -1;
}

function validateAndFix(opts) {

  if (!(0, _lodash2.default)(opts)) return;

  if (opts.full) {
    if (typeof opts.plugins === 'undefined' || Array.isArray(opts.plugins) && opts.plugins.length === 0) {
      opts.plugins = [].concat(essentialPlugins);
      return;
    }
  }

  // opts.full is false, plugins can be empty
  if (typeof opts.plugins === 'undefined') return;
  if (Array.isArray(opts.plugins) && opts.plugins.length === 0) return;

  // track whether its defined in opts.plugins
  var state = essentialPlugins.reduce(function (p, c) {
    var _Object$assign;

    return Object.assign(p, (_Object$assign = {}, _Object$assign[c] = false, _Object$assign));
  }, {});

  opts.plugins.map(function (p) {
    if (typeof p === 'string' && isEssentialPlugin(p)) {
      state[p] = true;
    } else if ((typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object') {
      Object.keys(p).forEach(function (k) {
        if (isEssentialPlugin(k)) {
          // make it essential
          if (!p[k]) p[k] = true;
          // and update state
          state[k] = true;
        }
      });
    }
  });

  Object.keys(state).filter(function (key) {
    return !state[key];
  }).forEach(function (key) {
    return opts.plugins.push(key);
  });
}