'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
require('dotenv').config();

var config = {
    jwt_secret: process.env.JWT_SECRET || 'JWT_SECRETjwt_secretJWT_SECRET',
    mongo_uri: process.env.MONGODB_URI
};

exports.default = config;