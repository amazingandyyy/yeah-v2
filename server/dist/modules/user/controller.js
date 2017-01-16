'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    getProfile: function getProfile(req, res, next) {
        if (!req.user) {
            return res.status(404).send('No user available');
        }
        res.send(req.user);
    }
};