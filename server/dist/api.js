'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _route = require('./modules/user/route');

var _route2 = _interopRequireDefault(_route);

var _route3 = require('./modules/volunteer/route');

var _route4 = _interopRequireDefault(_route3);

var _resource = require('./resource.route');

var _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.get('/', function (req, res) {
  res.send('You are connected to yeah-server-api');
});

router.use('/user', _route2.default);
router.use('/resource', _resource2.default);

exports.default = router;