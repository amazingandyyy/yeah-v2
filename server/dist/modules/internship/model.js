'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseAutopopulate = require('mongoose-autopopulate');

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _point = require('../schemas/point');

var _point2 = _interopRequireDefault(_point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Define the model
var Schema = new _mongoose2.default.Schema({
  position: {
    type: String,
    required: [true, 'Title is required']
  },
  company: {
    type: String
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  location: {
    type: Object
  },
  geometry: _point2.default,
  description: {
    type: String
  },
  tags: [{
    type: String
  }],
  createBy: {
    type: _mongoose2.default.Schema.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  stories: [{
    participant: {
      type: _mongoose2.default.Schema.ObjectId,
      ref: 'User',
      autopopulate: true
    },
    body: {
      type: String
    },
    createAt: {
      type: Number,
      default: Date.now()
    },
    photos: [{
      type: String
    }]
  }],
  createAt: {
    type: Number,
    default: Date.now()
  }
});

Schema.plugin(_mongooseAutopopulate2.default);

exports.default = _mongoose2.default.model('Internship', Schema);