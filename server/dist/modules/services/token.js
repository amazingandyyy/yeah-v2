'use strict';

var jwt = require('jwt-simple');
var config = require('../../config');

exports.token = {
    generateToken: function generateToken(user) {
        var timeStamp = new Date().getTime();
        var payload = {
            sub: user.id,
            iat: timeStamp
        };
        return jwt.encode(payload, config.jwt_secret);
    },
    verifyToken: function verifyToken(token, cb) {
        var decode = jwt.decode(token, config.jwt_secret);
        if (!decode) {
            return cb({ error: 'Token is not verified.' });
        }

        cb(null, decode);
    }
};