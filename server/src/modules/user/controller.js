import User from './model';
import AWS from 'aws-sdk';
import config from '../../config';
// import uuid from 'uuid';
function uuid(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

const s3 = new AWS.S3();
AWS
  .config
  .update({accessKeyId: config.aws_access_key_id, secretAccessKey: config.aws_secret_access_key});

const getProfile = (req, res, next) => {
  if (!req.user) {
    return res
      .status(404)
      .send('No user found')
  }
  console.log('uuid: ', uuid())
  res.send(req.user);
}

const uploadAvatar = (req, res, next) => {
  const userId = req.user._id;
  const file = req.file;

  if (!file.mimetype.match(/image/)) {
    return res.send({error: 'File must be image'})
  }

  let filenameParts = file
    .originalname
    .split('.');
  let ext;
  if (filenameParts.length > 1) {
    ext = "." + filenameParts.pop();
  } else {
    ext = '';
  }

  const uuidKey = `user/${userId}/${uuid()}${ext}`; // route and file name(unique)
  const bucket = config.aws_s3_bucket;
  const url_base = config.aws_s3_url_base;

  let params = {
    Bucket: bucket,
    Key: uuidKey,
    ACL: 'public-read-write',
    Body: file.buffer
  }
  console.log(params)

  s3.putObject(params, (err, result) => {
    if (err) {
      console.log(err)
      return res.send({error: err})
    };
    let avatarUrl = `${url_base}/${bucket}/${uuidKey}`;
    User
      .findByIdAndUpdate(userId, {avatar: avatarUrl})
      .then(() => User.findById(userId))
      .then((user) => {
        res.send(user)
      })
      .catch(next)
  });
}

const uploadProfile = (req, res, next) => {
  const userId = req.user._id;
  const userData = req.body;
  User.findByIdAndUpdate(userId, userData, {new: true})
  .then(user => {
    res.send(user)
  })
  .catch(next)
}

const permanentlyDeleteThisAcount = (req, res, next) => {
  const email = req.user.email;
  const { password } = req.body;
  if (!email || !password) {
    return next()
  }
  User
    .findOne({
            'email.data': {
                '$in': email
            }
        })
    .select('+password')
    .then(existingUser => {
      bcrypt.compare(password, existingUser.password, (err, good) => {
        if (err || !good) {
          return next()
        }
        User.findByIdAndRemove(existingUser._id)
          .then(()=>res.send({ message: 'delete account', success: true }))
          .catch(next)
        })
    })
    .catch(next)
}

export default {
  getProfile,
  uploadAvatar,
  uploadProfile,
  permanentlyDeleteThisAcount
};