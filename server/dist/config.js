'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
require('dotenv').config();
var settingIsGood = true;

if (!process.env.JWT_SECRET) {
    exports.settingIsGood = settingIsGood = false;console.log('no process.env.JWT_SECRET');
}
if (!process.env.MONGODB_URI) {
    exports.settingIsGood = settingIsGood = false;console.log('no process.env.MONGODB_URI');
}
if (!process.env.AWS_ACCESS_KEY_ID) {
    exports.settingIsGood = settingIsGood = false;console.log('no process.env.AWS_ACCESS_KEY_ID');
}
if (!process.env.AWS_SECRET_ACCESS_KEY) {
    exports.settingIsGood = settingIsGood = false;console.log('no process.env.AWS_SECRET_ACCESS_KEY');
}

var config = void 0;
if (process.env.NODE_ENV == 'production') {
    // production
    config = {
        jwt_secret: process.env.JWT_SECRET,
        mongo_uri: process.env.MONGODB_URI,
        aws_id: process.env.AWS_ACCESS_KEY_ID,
        aws_secret: process.env.AWS_SECRET_ACCESS_KEY,
        mongo_log: 'Real one',
        aws_s3_bucket: 'yeah-assets',
        aws_s3_url_base: 'https://s3-us-west-1.amazonaws.com'
    };
} else {
    // development configuration
    config = {
        jwt_secret: 'secret',
        mongo_uri: 'mongodb://localhost/yeah-v2-sandbox',
        aws_id: process.env.AWS_ACCESS_KEY_ID,
        aws_secret: process.env.AWS_SECRET_ACCESS_KEY,
        mongo_log: 'mongodb://localhost/yeah-v2-sandbox',
        aws_s3_bucket: 'yeah-assets-dev',
        aws_s3_url_base: 'https://s3-us-west-2.amazonaws.com'
    };
}

exports.default = config;
exports.settingIsGood = settingIsGood;