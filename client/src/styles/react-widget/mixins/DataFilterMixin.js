'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _filter = require('../util/filter');

var _filter2 = _interopRequireDefault(_filter);

var _propTypes = require('../util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dataHelpers = require('../util/dataHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dflt = function dflt(f) {
  return f === true ? 'startsWith' : f ? f : 'eq';
};

module.exports = {

  propTypes: {
    data: _react2.default.PropTypes.array,
    value: _react2.default.PropTypes.any,
    filter: _propTypes2.default.filter,
    caseSensitive: _react2.default.PropTypes.bool,
    minLength: _react2.default.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      caseSensitive: false,
      minLength: 1
    };
  },
  filterIndexOf: function filterIndexOf(items, searchTerm) {
    var idx = -1,
        matches = typeof this.props.filter === 'function' ? this.props.filter : getFilter(_filter2.default[dflt(this.props.filter)], searchTerm, this);

    if (!searchTerm || !searchTerm.trim() || this.props.filter && searchTerm.length < (this.props.minLength || 1)) return -1;

    items.every(function (item, i) {
      if (matches(item, searchTerm, i)) return idx = i, false;

      return true;
    });

    return idx;
  },
  filter: function filter(items, searchTerm) {
    var matches = typeof this.props.filter === 'string' ? getFilter(_filter2.default[this.props.filter], searchTerm, this) : this.props.filter;

    if (!matches || !searchTerm || !searchTerm.trim() || searchTerm.length < (this.props.minLength || 1)) return items;

    return items.filter(function (item, idx) {
      return matches(item, searchTerm, idx);
    });
  }
};

function getFilter(matcher, searchTerm, ctx) {
  searchTerm = !ctx.props.caseSensitive ? searchTerm.toLowerCase() : searchTerm;

  return function (item) {
    var val = (0, _dataHelpers.dataText)(item, ctx.props.textField);

    if (!ctx.props.caseSensitive) val = val.toLowerCase();

    return matcher(val, searchTerm);
  };
}