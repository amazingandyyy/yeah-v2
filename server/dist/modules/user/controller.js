'use strict';

var bcrypt = require('bcrypt-nodejs');

var token = require('../services').token;
var User = require('./model');

module.exports = {
    getOneUser: function getOneUser(req, res) {
        var userId = req.query.userId;
        if (!userId) {
            return res.status(401).send('missing required fields');
        }

        User.findById(userId, function (err, data) {
            if (err || !data) {
                return res.status(401).send(err || 'User not found');
            }
            var sendUser = data; // can hide some info here
            res.send(sendUser);
        });
    },

    checkAuthorization: function checkAuthorization(req, res, next) {
        var userId = req.query.userId;
        if (!userId) {
            return res.status(401).send('missing required fields');
        }
        if (userId !== req.user.id) {
            return res.status(401).send('NOT authorized!');
        }
        next();
    },

    getCurrentUser: function getCurrentUser(req, res) {
        res.send(req.user);
    }

};