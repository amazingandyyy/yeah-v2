import bcrypt from 'bcrypt-nodejs';

import {generateToken} from '../services';
import User from './model';
import AdminController from '../admin/controller';

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
                AdminController.checkAdminById(existingUser._id).then(admin=>{
                    if(admin){
                        return res.send({success: true, token: generateToken(existingUser), isAdmin: true})
                    }
                    res.send({success: true, token: generateToken(existingUser), isAdmin: false})
                })
            })
        })
        .catch(next)
}

export default {
    signin,
    signup
}