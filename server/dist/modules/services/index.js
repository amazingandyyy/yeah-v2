'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _token = require('./token');

Object.keys(_token).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _token[key];
    }
  });
});

var _uuid = require('./uuid');

Object.keys(_uuid).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _uuid[key];
    }
  });
});