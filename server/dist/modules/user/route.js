'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _middleware = require('../../middleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// public behavior
router.post('/signup', _auth2.default.signup);
router.post('/signin', _auth2.default.signin);

// login and authorization required
// router.use('/api', middleweare.loginRequired, controller.checkAuthorization);
// router.get('/api/getCurrentUser', controller.getCurrentUser);
router.get('/profile', _middleware.loginRequired, _controller2.default.getProfile);

module.exports = router;