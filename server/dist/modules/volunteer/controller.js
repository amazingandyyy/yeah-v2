'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    createResource: function createResource(req, res, next) {
        var createBy = req.user._id;
        var title = req.body.title;
        var resource = { createBy: createBy, title: title };
        console.log('resource: ', resource);
        _model2.default.create(resource).then(function (data) {
            res.send();
        }).catch(next);
    },
    fetchAll: function fetchAll(req, res, next) {
        _model2.default.find({}).then(function (data) {
            res.json(data);
        }).catch(next);
    }
};