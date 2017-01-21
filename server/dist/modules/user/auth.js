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
            res.send({ success: true, token: (0, _services.generateToken)(existingUser) });
        });
    }).catch(next);
};

exports.default = {
    signin: signin,
    signup: signup
};