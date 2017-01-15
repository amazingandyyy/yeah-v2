const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const autopopulate = require('mongoose-autopopulate');

// Define the model
const Schema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: function (name) {
        return name.length > 2;
      },
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    select: false,
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

Schema.plugin(autopopulate);

Schema
  .virtual('postCount')
  .get(function () {
    return this.posts.length;
  });
Schema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('email must be unique'));
  } else {
    next(error);
  }
});
Schema.pre('save', function (next) {
  // get access to user model, then we can use user.email, user.password
  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err)
    }

    bcrypt
      .hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next()
      })
  })
})

Schema.pre('remove', function (next) {
  const Organization = mongoose.model('Organization');

  Organization
    .remove({
      _id: {
        $in: this.organizations
      }
    })
    .then(function () {
      next()
    })

})

Schema.statics.comparedPassword = function (candidatePassword, cb) {
  bcrypt
    .compare(candidatePassword, this.password, function (err, good) {
      if (err) {
        return cb(err)
      };
      cb(null, good);
    })
}

module.exports = mongoose.model('User', Schema);