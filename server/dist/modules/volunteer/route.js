'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _middleware = require('../../middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// authorization required
router.post('/createResource', _middleware.loginRequired, _controller2.default.createResource);

// public request
router.get('/fetchAll', _controller2.default.fetchAll);
router.get('/fetchOne/:id', _controller2.default.fetchOne);

module.exports = router;