'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkAdmin = exports.readFile = exports.loginRequired = undefined;

var _model = require('./modules/user/model');

var _model2 = _interopRequireDefault(_model);

var _services = require('./modules/services');

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _controller = require('./modules/admin/controller');

var _controller2 = _interopRequireDefault(_controller);

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
            return next();
        }).catch(next);
    });
};

var upload = (0, _multer2.default)({
    storage: _multer2.default.memoryStorage()
});

var readFile = upload.single('asset');

var checkAdmin = function checkAdmin(req, res, next) {
    var userId = req.user._id;
    if (!userId) res.status(401).send('admin need to login');
    _controller2.default.checkAdminById(userId).then(function (user) {
        if (!user) {
            return res.status(403).send({ fail: 'you are not admin' });
        }
        next();
    }).catch(next);
};

exports.loginRequired = loginRequired;
exports.readFile = readFile;
exports.checkAdmin = checkAdmin;