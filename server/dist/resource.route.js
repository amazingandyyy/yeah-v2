'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _route = require('./modules/volunteer/route');

var _route2 = _interopRequireDefault(_route);

var _route3 = require('./modules/intership/route');

var _route4 = _interopRequireDefault(_route3);

var _route5 = require('./modules/course/route');

var _route6 = _interopRequireDefault(_route5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.use('/volunteer', _route2.default);
router.use('/intership', _route4.default);
router.use('/course', _route6.default);

exports.default = router;