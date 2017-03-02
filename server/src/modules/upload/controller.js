import AWS from 'aws-sdk';
import config from '../../config';

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

export default {
  uploadFile: function(req, res, next) {
    const file = req.file;
    const folderName = req.params.folder;

    let filenameParts = file
      .originalname
      .split('.');
    let ext;
    if (filenameParts.length > 1) {
      ext = "." + filenameParts.pop();
    } else {
      ext = '';
    }

    const url_base = config.aws_s3_url_base;
    const bucket = config.aws_s3_bucket;
    const uuidKey = `medias/${folderName}/${uuid()}${ext}`; // route and file name(unique)

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
      res.send({file: avatarUrl});
    });
  }

}