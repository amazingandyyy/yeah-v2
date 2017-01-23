'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifyToken = exports.generateToken = undefined;

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateToken = function generateToken(user) {
    var timeStamp = new Date().getTime();
    var payload = {
        sub: user._id,
        iat: timeStamp,
        exp: (0, _moment2.default)().add(7, 'days').unix()
    };
    return _jwtSimple2.default.encode(payload, _config2.default.jwt_secret);
};
var verifyToken = function verifyToken(token, cb) {
    console.log('token: ', token);
    var decode = _jwtSimple2.default.decode(token, _config2.default.jwt_secret);
    if (!decode) {
        return cb({ error: 'Token is not verified.' });
    }

    cb(null, decode);
};

exports.generateToken = generateToken;
exports.verifyToken = verifyToken;