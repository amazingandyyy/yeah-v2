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

var instructorSchema = new _mongoose2.default.Schema({
  email: String,
  prevousPosition: {
    affiliation: String,
    position: String
  },
  firstName: String,
  lastName: String,
  currentPosition: {
    affiliation: String,
    position: String
  },
  phone: String,
  linkedinURL: String
});
var courseSchema = new _mongoose2.default.Schema({
  title: String,
  tags: [String],
  overview: String,
  startingDate: String,
  hoursPerWeek: String,
  totalWeeks: String,
  time: String,
  location: Object,
  locationNotes: String,
  geometry: _point2.default,
  textbook: String,
  syllabus: Boolean,
  heighlight: [{
    title: String,
    description: String
  }],
  takeaways: [{
    title: String,
    description: String
  }],
  preRequirement: String
});
var statusSchema = new _mongoose2.default.Schema({
  participant: [{
    userId: {
      type: _mongoose2.default.Schema.ObjectId,
      ref: 'User'
    },
    checkedIn: {
      type: Boolean,
      default: false
    },
    checkedInAt: {
      type: Number
    },
    signedUpAt: {
      type: Number,
      default: Date.now()
    }
  }],
  started: {
    type: Boolean,
    default: false
  }
});
// Define the model
var Schema = new _mongoose2.default.Schema({
  course: courseSchema,
  instructor: instructorSchema,
  status: statusSchema,
  createBy: {
    type: _mongoose2.default.Schema.ObjectId,
    ref: 'User'
  },
  createAt: {
    type: Number,
    default: Date.now()
  }
});

exports.default = _mongoose2.default.model('Course', Schema);