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
        var coordinates = null;
        var data = _extends({}, req.body, {
            createBy: createBy
        });
        _model2.default.create(data).then(function (savedData) {
            console.log('savedData: ', savedData);
            res.send({ success: true });
        }).catch(next);
    },
    fetchAll: function fetchAll(req, res, next) {
        _model2.default.find({}).then(function (data) {
            res.send(data);
        }).catch(next);
    },
    fetchOne: function fetchOne(req, res, next) {
        _model2.default.findById(req.params.id).then(function (data) {
            console.log(data);
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
    },
    signupOneForOneCourse: function signupOneForOneCourse(req, res, next) {
        _model2.default.findById(req.params.id, req.body).then(function (course) {
            var userId = req.params.userId;
            course.participants.push({ userId: userId });
            return course.save();
        }).then(function () {
            res.send();
        }).catch(next);
    },
    checkinOneforOneCourse: function checkinOneforOneCourse(req, res, next) {
        _model2.default.findOneAndUpdate(req.params.id, req.body).then(function (course) {
            // const userId = req.params.userId;
            // course.participants.push(userId);
            // return course.save();
        }).then(function () {
            res.send();
        }).catch(next);
    }
};