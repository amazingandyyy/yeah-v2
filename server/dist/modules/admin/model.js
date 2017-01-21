'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Define the model
var Schema = new _mongoose2.default.Schema({
    user: {
        type: _mongoose2.default.Schema.ObjectId,
        ref: 'User',
        unique: true
    },
    createAt: {
        type: Number,
        default: Date.now()
    }
});

exports.default = _mongoose2.default.model('Admin', Schema);