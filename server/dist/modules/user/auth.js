'use strict';

var bcrypt = require('bcrypt-nodejs');

var token = require('../services').token;
var User = require('./model');

module.exports = {
    signup: function signup(req, res) {
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;

        if (!email || !password) {
            return res.status(422).send({ error: 'You must provide email and password.' });
        }
        User.findOne({
            email: email
        }, function (err, existingUser) {
            if (err) {
                return res.status(422).send(err);
            }
            if (existingUser) {
                return res.status(422).send({ error: 'Email is in use' });
            }
            var user = new User({ name: name, email: email, password: password });

            user.save(function (err, savedUser) {
                if (err) {
                    return res.status(500).send(err);
                }

                res.json({
                    success: true,
                    token: token.generateToken(savedUser)
                });
            });
        });
    },

    signin: function signin(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        if (!email || !password) {
            return res.status(422).send({ error: 'You must provide email and password.' });
        }
        User.findOne({
            email: email
        }, function (err, existingUser) {
            if (err || !existingUser) {
                return res.status(401).send(err || {
                    error: "User Not Found"
                });
            }
            if (existingUser) {
                bcrypt.compare(password, existingUser.password, function (err, good) {
                    if (err || !good) {
                        return res.status(401).send(err || 'User not found');
                    }
                    res.send({
                        token: token.generateToken(existingUser)
                    });
                });
            }
        }).select('+password');
    }

};