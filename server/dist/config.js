'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = {
    jwt_secret: process.env.JWT_SECRET || 'secret secret secret',
    mongo_uri: process.env.MONGODB_URI || 'mongodb://localhost/yeah-v2-server'
};

exports.default = config;