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
  // title: {
  //   type: String, 
  //   required: [true, 'Title is required']
  // },
  // time: {
  //   type: String
  // }，
  // description: {
  //   type: String
  // },
  date: {
    type: String
  },
  location: Object,
  locationDetails: String,
  geometry: _point2.default,
  tags: [{
    type: String
  }],
  createBy: {
    type: _mongoose2.default.Schema.ObjectId,
    ref: 'User'
  },
  stories: [{
    participant: {
      type: _mongoose2.default.Schema.ObjectId,
      ref: 'User'
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
  },
  participant: [{
    userId: {
      type: _mongoose2.default.Schema.ObjectId,
      ref: 'User'
    },
    checkedIn: {
      type: Boolean,
      required: true,
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
  email: {
    type: String
  },
  companyAffiliation: {
    type: String
  },
  firstName: {
    type: String
  },
  heighlightTitle: [{
    type: String
  }],
  heighlightDescription: [{
    type: String
  }],
  hoursPerWeek: {
    type: String
  },
  instructor: {
    type: String
  },
  lastName: {
    type: String
  },
  linkedIn: {
    type: String
  },
  overview: {
    type: String
  },
  phoneNumber: {
    type: Number
  },
  preRequisites: {
    type: String
  },
  schoolAffiliation: {
    type: String
  },
  isSyllabusSent: {
    type: Boolean
  },
  takeaways: [{
    type: String
  }],
  textbook: {
    type: String
  },
  title: {
    type: String
  },
  howManyWeeks: {
    type: String
  }
});

exports.default = _mongoose2.default.model('Course', Schema);