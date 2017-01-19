import User from './model';
import AWS from 'aws-sdk';
import config from '../../config';
import uuid from 'uuid';

const s3 = new AWS.S3();
AWS
    .config
    .update({accessKeyId: config.aws_access_key_id, secretAccessKey: config.aws_secret_access_key});

export default {
    getProfile : function (req, res, next) {
        if (!req.user) {
            return res
                .status(404)
                .send('No user found')
        }
        res.send(req.user);
    },
    uploadAvatar : function (req, res, next) {
        const userId = req.user._id;
        const file = req.file;

        if (!file.mimetype.match(/image/)) {
            return res.send({error: 'File must be image'})
        }

        let filenameParts = file.originalname.split('.');
        let ext;
        if (filenameParts.length > 1) {
            ext = "." + filenameParts.pop();
        } else {
            ext = '';
        }

        const uuidKey = `user/${userId}/avatar${ext}`;
        const bucket = config.aws_s3_bucket;
        const url_base = config.aws_s3_url_base;

        let params = {
            Bucket: bucket,
            Key: uuidKey,
            ACL: 'public-read-write',
            Body: file.buffer
        }

        s3.putObject(params, (err, result) => {
            if (err) {return next()}
            let avatarUrl = `${url_base}/${bucket}/${uuidKey}`;
                User.findByIdAndUpdate(userId, {avatar: avatarUrl})
                .then(()=>User.findById(userId))
                .then((user)=>res.send(user))
                .catch(next)
            });
        }
}
