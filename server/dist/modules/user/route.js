'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _middleware = require('../../middleware');

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// public request
router.post('/signup', _auth2.default.signup);
router.post('/signin/email', _auth2.default.signin);
router.post('/signin/fb', _auth2.default.signinWithFacebook);

router.post('/helper/sendEmailToResetPassword/:email', _auth2.default.sendEmailToResetPassword);
router.post('/helper/verifyToken/:token', _auth2.default.verifyTokenCtrl);
router.post('/helper/resetPassword', _auth2.default.resetPassword);
// router.post('/helper/resetPassword', auth.sendEmailToResetPassword);

// authorization required
router.use('/profile', _middleware.loginRequired);
router.delete('/permanentlyDeleteThisAcount', _controller2.default.permanentlyDeleteThisAcount);

router.get('/profile', _controller2.default.getProfile);
router.post('/profile/avatar', _middleware.readFile, _controller2.default.uploadAvatar);

exports.default = router;