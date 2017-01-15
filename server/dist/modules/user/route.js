'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _middleware = require('../../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// public behavior
router.post('/signup', _auth2.default.signup);
router.post('/signin', _auth2.default.signin);
// router.get('/getOneUser', controller.getOneUser);

// login and authorization required
// router.use('/api', middleweare.loginRequired, controller.checkAuthorization);
// router.get('/api/getCurrentUser', controller.getCurrentUser);

module.exports = router;