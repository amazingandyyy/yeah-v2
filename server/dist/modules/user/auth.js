'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _services = require('../services');

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    signup: function signup(req, res, next) {
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;

        if (!name || !email || !password) {
            return next();
        }
        _model2.default.create({ name: name, email: email, password: password }).then(function (savedUser) {
            res.json({ success: true, token: (0, _services.generateToken)(savedUser) });
        }).catch(next);
    },

    signin: function signin(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        if (!email || !password) {
            return next();
        }
        _model2.default.findOne({ email: email }).select('+password').then(function (existingUser) {
            _bcryptNodejs2.default.compare(password, existingUser.password, function (err, good) {
                if (err || !good) {
                    return next();
                }
                res.send({
                    success: true,
                    token: (0, _services.generateToken)(existingUser)
                });
            });
        }).catch(next);
    }
};