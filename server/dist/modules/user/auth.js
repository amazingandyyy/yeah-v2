'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _services = require('../services');

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _controller = require('../admin/controller');

var _controller2 = _interopRequireDefault(_controller);

var _nodeSes = require('node-ses');

var _nodeSes2 = _interopRequireDefault(_nodeSes);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signup = function signup(req, res, next) {
    if (!req.body.email || !req.body.password) {
        return next();
    };
    var userData = _extends({}, req.body, {
        email: {
            data: req.body.email
        }
    });
    _model2.default.create(userData).then(function (savedUser) {
        res.json({ success: true, token: (0, _services.generateToken)(savedUser) });
    }).catch(next);
};

var signin = function signin(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password) {
        return next();
    }
    _model2.default.findOne({
        'email.data': {
            '$in': email
        }
    }).select('+password').then(function (existingUser) {
        _bcryptNodejs2.default.compare(password, existingUser.password, function (err, good) {
            if (err || !good) {
                return next();
            }
            _controller2.default.checkAdminById(existingUser._id).then(function (admin) {
                if (admin) {
                    return res.send({ success: true, token: (0, _services.generateToken)(existingUser), isAdmin: true });
                }
                res.send({ success: true, token: (0, _services.generateToken)(existingUser), isAdmin: false });
            });
        });
    }).catch(next);
};

var dealWithFB = function dealWithFB(req, res, next) {
    var FBData = req.body;
    var facebookUserId = FBData.userID;
    var facebookToken = FBData.accessToken;
    var facebookUserName = FBData.name.split(' ');
    _model2.default.findOne({
        'facebook.userID': {
            '$in': facebookUserId
        }
    }, function (err, existingUser) {
        if (err) {
            next();
        }
        if (existingUser) {
            _controller2.default.checkAdminById(existingUser._id).then(function (admin) {
                if (admin) {
                    return res.send({ success: true, token: (0, _services.generateToken)(existingUser), isAdmin: true });
                }
                res.send({ success: true, token: (0, _services.generateToken)(existingUser), isAdmin: false });
            });
        }
        if (!existingUser) {
            console.log('no user');
            var userData = {
                name: {
                    first: facebookUserName[0],
                    last: facebookUserName[1]
                },
                avatar: FBData.picture.data.url,
                email: {
                    data: FBData.email,
                    verified: true
                },
                facebook: {
                    userID: facebookUserId,
                    accessToken: facebookToken
                }
            };
            _model2.default.create(userData).then(function (savedUser) {
                res.send({ success: true, token: (0, _services.generateToken)(savedUser), facebookSignUp: true });
            }).catch(next);
        }
    });
};

var signupWithFacebook = dealWithFB;
var signinWithFacebook = dealWithFB;

var sendEmailToResetPassword = function sendEmailToResetPassword(req, res, next) {
    var userEmail = req.params.email;
    _model2.default.findOne({
        'email.data': {
            '$in': userEmail
        }
    }).then(function (existingUser) {
        if (!existingUser) {
            return res.status(404).send({ type: 'EMAIL_NOT_FOUND', redirectTo: 'signup' });
        };
        if (existingUser) {
            var token = generateToken2(existingUser);
            var EmailService = _nodeSes2.default.createClient({
                key: _config2.default.aws_id,
                secret: _config2.default.aws_secret
            });
            var resetURI = _config2.default.redirect_url_base + '/#/auth/resetpassword/' + token;

            EmailService.sendEmail({
                to: userEmail,
                from: _config2.default.aws_ses_sender,
                subject: 'YEAH Password Reset',
                message: '<h2>Password Reset: </h2> <br/> <a>' + resetURI + '</a>'
            }, function (err, data) {
                if (err) {
                    console.log(err);
                    return next();
                }
                res.send({ type: 'EMAIL_SEND', status: true });
            });
        }
    }).catch(next);
};

var verifyTokenCtrl = function verifyTokenCtrl(req, res, next) {
    // console.log('token: ', req.params.token)
    var token = req.params.token;

    verifyToken2(token, function (err, payload) {
        if (err) {
            return next();
        }
        _model2.default.findById(payload.sub).then(function (dbUser) {
            if (err || !dbUser) {
                return next();
            }
            res.send({ verified: true });
        }).catch(next);
    });
};
var generateToken2 = function generateToken2(user) {
    var timeStamp = new Date().getTime();
    var payload = {
        sub: user._id,
        iat: timeStamp,
        exp: (0, _moment2.default)().add(12, 'hours').unix()
    };
    return _jwtSimple2.default.encode(payload, _config2.default.jwt_secret + _config2.default.unique_salt);
};
var verifyToken2 = function verifyToken2(token, cb) {
    var decode = _jwtSimple2.default.decode(token, _config2.default.jwt_secret + _config2.default.unique_salt);
    if (!decode) {
        return cb({ error: 'Token is not verified.' });
    }
    cb(null, decode);
};

var resetPassword = function resetPassword(req, res, next) {
    var _req$body = req.body,
        token = _req$body.token,
        password = _req$body.password;


    verifyToken2(token, function (err, payload) {
        if (err) {
            return next();
        }
        _model2.default.findById(payload.sub).select('+password').then(function (dbUser) {
            if (err || !dbUser) {
                return next();
            }
            dbUser.password = password;
            return dbUser.save();
        }).then(function (savedUser) {
            console.log('savedUser: ', savedUser);
            res.send({ reset: true });
        }).catch(next);
    });
};

exports.default = {
    signin: signin,
    signup: signup,
    signinWithFacebook: signinWithFacebook,
    signupWithFacebook: signupWithFacebook,
    sendEmailToResetPassword: sendEmailToResetPassword,
    verifyTokenCtrl: verifyTokenCtrl,
    resetPassword: resetPassword
};