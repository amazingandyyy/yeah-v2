'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    createOne: function createOne(req, res, next) {
        var createBy = req.user._id;
        var title = req.body.title;
        var data = void 0;
        if (req.body.location) {
            var coordinates = [req.body.location.location.lng, req.body.location.location.lat];
            data = _extends({
                createBy: createBy
            }, req.body, {
                geometry: {
                    coordinates: coordinates
                }
            });
        } else {
            data = _extends({
                createBy: createBy
            }, req.body);
        }
        _model2.default.create(data).then(function () {
            res.send();
        }).catch(next);
    },
    fetchAll: function fetchAll(req, res, next) {
        _model2.default.find({}).then(function (data) {
            res.send(data);
        }).catch(next);
    },
    fetchOne: function fetchOne(req, res, next) {
        _model2.default.findById(req.params.id).then(function (data) {
            res.send(data);
        }).catch(next);
    },
    deleteOne: function deleteOne(req, res, next) {
        console.log('req.params.id: ', req.params.id);
        _model2.default.findByIdAndRemove(req.params.id).then(function () {
            res.send();
        }).catch(next);
    },
    updateOne: function updateOne(req, res, next) {
        _model2.default.findByIdAndUpdate(req.params.id, req.body).then(function () {
            res.send();
        }).catch(next);
    }
};