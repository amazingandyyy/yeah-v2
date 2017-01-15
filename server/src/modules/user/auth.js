const bcrypt = require('bcrypt-nodejs')

const token = require('../services').token;
const User = require('./model');

module.exports = {
    signup: function (req, res) {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res
                .status(422)
                .send({error: 'You must provide email and password.'})
        }
        User
            .findOne({
                email: email
            }, function (err, existingUser) {
                if (err) {
                    return res
                        .status(422)
                        .send(err)
                }
                if (existingUser) {
                    return res
                        .status(422)
                        .send({error: 'Email is in use'});
                }
                const user = new User({name: name, email: email, password: password})

                user.save(function (err, savedUser) {
                    if (err) {
                        return res.status(500).send(err);
                    }

                    res.json({
                        success: true,
                        token: token.generateToken(savedUser)
                    })
                })
            })
    },

    signin: function (req, res) {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return res
                .status(422)
                .send({error: 'You must provide email and password.'});
        }
        User
            .findOne({
                email: email
            }, function (err, existingUser) {
                if (err || !existingUser) {
                    return res
                        .status(401)
                        .send(err || {
                            error: "User Not Found"
                        })
                }
                if (existingUser) {
                    bcrypt
                        .compare(password, existingUser.password, function (err, good) {
                            if (err || !good) {
                                return res
                                    .status(401)
                                    .send(err || 'User not found')
                            }
                            res.send({
                                token: token.generateToken(existingUser)
                            })
                        })
                }
            }).select('+password')
    }
    
}