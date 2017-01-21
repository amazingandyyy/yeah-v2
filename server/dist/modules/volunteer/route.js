'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _middleware = require('../../middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// authorization required
router.post('/createResource', _middleware.loginRequired, _middleware.checkAdmin, _controller2.default.createResource);

// public request
router.get('/fetchAll', _middleware.loginRequired, _controller2.default.fetchAll);
router.get('/fetchOne/:id', _controller2.default.fetchOne);
router.delete('/deleteOne/:id', _middleware.loginRequired, _middleware.checkAdmin, _controller2.default.deleteOne);

exports.default = router;