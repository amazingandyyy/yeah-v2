'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s3 = new _awsSdk2.default.S3();
_awsSdk2.default.config.update({ accessKeyId: _config2.default.aws_access_key_id, secretAccessKey: _config2.default.aws_secret_access_key });

var getProfile = function getProfile(req, res, next) {
  if (!req.user) {
    return res.status(404).send('No user found');
  }
  res.send(req.user);
};

var uploadAvatar = function uploadAvatar(req, res, next) {
  var userId = req.user._id;
  var file = req.file;

  if (!file.mimetype.match(/image/)) {
    return res.send({ error: 'File must be image' });
  }

  var filenameParts = file.originalname.split('.');
  var ext = void 0;
  if (filenameParts.length > 1) {
    ext = "." + filenameParts.pop();
  } else {
    ext = '';
  }

  var uuidKey = 'user/' + userId + '/' + _uuid2.default.v4() + ext; // route and file name(unique)
  var bucket = _config2.default.aws_s3_bucket;
  var url_base = _config2.default.aws_s3_url_base;

  var params = {
    Bucket: bucket,
    Key: uuidKey,
    ACL: 'public-read-write',
    Body: file.buffer
  };
  console.log(params);

  s3.putObject(params, function (err, result) {
    if (err) {
      console.log(err);
      return res.send({ error: err });
    };
    var avatarUrl = url_base + '/' + bucket + '/' + uuidKey;
    _model2.default.findByIdAndUpdate(userId, { avatar: avatarUrl }).then(function () {
      return _model2.default.findById(userId);
    }).then(function (user) {
      res.send(user);
    }).catch(next);
  });
};

var permanentlyDeleteThisAcount = function permanentlyDeleteThisAcount(req, res, next) {
  var email = req.user.email;
  var password = req.body.password;

  if (!email || !password) {
    return next();
  }
  _model2.default.findOne({
    'email.data': {
      '$in': email
    }
  }).select('+password').then(function (existingUser) {
    bcrypt.compare(password, existingUser.password, function (err, good) {
      if (err || !good) {
        return next();
      }
      _model2.default.findByIdAndRemove(existingUser._id).then(function () {
        return res.send({ message: 'delete account', success: true });
      }).catch(next);
    });
  }).catch(next);
};

exports.default = {
  getProfile: getProfile,
  uploadAvatar: uploadAvatar,
  permanentlyDeleteThisAcount: permanentlyDeleteThisAcount
};