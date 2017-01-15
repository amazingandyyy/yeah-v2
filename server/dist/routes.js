'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  res.send('year-server docs: https://gist.github.com/amazingandyyy/3801e5d2da49ab191f4567bfa7ebb06c');
});

router.use('/user', require('./modules/user/route'));

exports.default = router;