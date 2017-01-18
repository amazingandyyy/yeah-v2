'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
require('dotenv').config();

var config = {
    jwt_secret: process.env.JWT_SECRET || 'JWT_SECRETjwt_secretJWT_SECRET',
    mongo_uri: process.env.MONGODB_URI,
    mongo_local_uri: 'mongodb://localhost/yeah-v2-sandbox'
};

exports.default = config;