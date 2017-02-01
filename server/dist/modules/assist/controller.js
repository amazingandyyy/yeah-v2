"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = {
    createOne: function createOne(req, res, next) {
        var createBy = req.user._id;
        var title = req.body.title;
        var data = _extends({ createBy: createBy }, req.body);
        Intership.create(data).then(function () {
            res.send();
        }).catch(next);
    }
};