import bcrypt from 'bcrypt-nodejs';

import {generateToken} from '../services';
import User from './model';

const signup = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return next()
    };
    const userData = {
        ...req.body,
        email: {
            data: req.body.email
        }
    };
    console.log(userData);
    User
        .create(userData)
        .then(savedUser => {
            res.json({success: true, token: generateToken(savedUser)})
        })
        .catch(next);
}

const signin = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return next()
    }
    User
        .findOne({
        'email.data': {
            '$in': email
        }
    })
        .select('+password')
        .then(existingUser => {
            bcrypt.compare(password, existingUser.password, (err, good) => {
                if (err || !good) {
                    return next()
                }
                res.send({success: true, token: generateToken(existingUser)})
            })
        })
        .catch(next)
}

export default {
    signin,
    signup
}