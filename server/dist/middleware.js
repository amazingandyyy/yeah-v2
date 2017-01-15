'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var User = require('./modules/user/model');
var token = require('./modules/services/token').token;

var loginRequired = function loginRequired(req, res, next) {
    if (!req.header('Authorization')) {
        return res.status(401).send({ message: 'Please make sure your request has an Authorization header.' });
    }
    // Validate jwt
    var try_token = req.header('Authorization').split(' ')[0];
    token.verifyToken(try_token, function (err, payload) {
        if (err) {
            return res.status(401).send(err);
        }
        User.findById(payload.sub).exec(function (err, user) {

            if (err || !user) {
                return res.status(404).send(err || {
                    error: 'middleware User not found!!!'
                });
            }
            req.user = user;
            next();
        });
    });
};

exports.loginRequired = loginRequired;