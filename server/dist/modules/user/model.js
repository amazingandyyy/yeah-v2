'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _mongooseAutopopulate = require('mongoose-autopopulate');

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Define the model
var Schema = new _mongoose2.default.Schema({
  name: {
    first: {
      type: String,
      validate: {
        validator: function validator(name) {
          return name.length > 2;
        },
        message: 'Name must be longer than 2 characters.'
      },
      required: [true, 'first name is required.']
    },
    last: {
      type: String,
      validate: {
        validator: function validator(name) {
          return name.length > 2;
        },
        message: 'Name must be longer than 2 characters.'
      }
    }
  },
  avatar: {
    type: String
  },
  email: {
    data: {
      type: String,
      unique: true,
      required: [true, 'Email is required.'],
      lowercase: true
    },
    verified: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  password: {
    type: String,
    select: false
  },
  createAt: {
    type: Number,
    default: Date.now()
  },
  timestamp: {
    type: Number,
    default: Date.now
  }
});

Schema.plugin(_mongooseAutopopulate2.default);

Schema.virtual('postCount').get(function () {
  return this.posts.length;
});
Schema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('email must be unique'));
  } else {
    next(error);
  }
});
Schema.pre('save', function (next) {
  // get access to user model, then we can use user.email, user.password
  var user = this;

  _bcryptNodejs2.default.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    _bcryptNodejs2.default.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

Schema.pre('remove', function (next) {
  var Organization = _mongoose2.default.model('Organization');

  Organization.remove({
    _id: {
      $in: this.organizations
    }
  }).then(function () {
    next();
  });
});

Schema.statics.comparedPassword = function (candidatePassword, cb) {
  _bcryptNodejs2.default.compare(candidatePassword, this.password, function (err, good) {
    if (err) {
      return cb(err);
    };
    cb(null, good);
  });
};

exports.default = _mongoose2.default.model('User', Schema);