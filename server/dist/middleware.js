'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loginRequired = undefined;

var _model = require('./modules/user/model');

var _model2 = _interopRequireDefault(_model);

var _services = require('./modules/services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginRequired = function loginRequired(req, res, next) {

    if (!req.header('Authorization')) {
        return res.status(401).send({ message: 'Please make sure your request has an Authorization header.' });
    }
    // Validate jwt
    var token = req.header('Authorization').split(' ')[0];
    (0, _services.verifyToken)(token, function (err, payload) {
        if (err) {
            return next();
        }
        _model2.default.findById(payload.sub).then(function (dbUser) {
            if (err || !dbUser) {
                return next();
            }
            req.user = dbUser;
            next();
        }).catch(next);
    });
};

exports.loginRequired = loginRequired;