'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('dotenv').config();

var enviroment = process.env.NODE_ENV;
var config = void 0;
var shareConfig = {
    aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    aws_s3_bucket: 'yeah-assets',
    aws_s3_url_base: 'https://s3-us-west-1.amazonaws.com'
};

if (enviroment == 'production') {
    config = _extends({}, shareConfig, {
        enviroment: enviroment,
        jwt_secret: process.env.JWT_SECRET,
        mongo_uri: process.env.MONGODB_URI,
        mongo_log: 'real mongoDB',
        domain_uri: 'http://yeah-beta.us-west-1.elasticbeanstalk.com'
    });
} else {
    config = _extends({}, shareConfig, {
        enviroment: enviroment,
        jwt_secret: process.env.JWT_SECRET || 'local jwt secret',
        mongo_uri: 'mongodb://localhost/yeah-v2-sandbox',
        mongo_log: 'mongodb://localhost/yeah-v2-sandbox',
        domain_uri: 'http://localhost:8000'
    });
}

exports.default = config;