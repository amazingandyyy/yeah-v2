'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _model3 = require('../user/model');

var _model4 = _interopRequireDefault(_model3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addAdminByEmail = function addAdminByEmail(email) {
    var userId = void 0;
    _model4.default.findOne({
        'email.data': {
            '$in': email
        }
    }).then(function (user) {
        userId = user._id;
        return _model2.default.findOne({ user: userId });
    }).then(function (admin) {
        if (admin) {
            throw new Error(email + ' is already an admin');
        }
        return _model2.default.create({ user: userId });
    }).then(function (user) {
        return console.log(email + ' is an new admin now');
    }).catch(function (err) {
        return console.log(err.message + ' when addAdminByEmail');
    });
};
var checkAdminById = function checkAdminById(id) {
    return _model2.default.findOne({ user: id });
};
var removeAdminByEmail = function removeAdminByEmail(email) {
    var userId = void 0;
    _model4.default.findOne({
        'email.data': {
            '$in': email
        }
    }).then(function (user) {
        userId = user._id;
        return _model2.default.findOneAndRemove({ user: userId });
    }).then(function () {
        return console.log(email + ' has been remove from admin list');
    }).catch(function (err) {
        return console.log(err.message + ' when removeAdminByEmail');
    });
};

var removeAdmin = function removeAdmin() {
    _model2.default.remove({}).then(function () {
        return console.log('Removed all admins data');
    }).then(function (err) {
        return console.log(err.message + ' when remove all admin');
    });
};

var controller = {
    addAdminByEmail: addAdminByEmail,
    checkAdminById: checkAdminById,
    removeAdminByEmail: removeAdminByEmail,
    removeAdmin: removeAdmin
};

exports.default = controller;