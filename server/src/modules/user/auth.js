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

const signin = (req, res, next) => {
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
                AdminController
                    .checkAdminById(existingUser._id)
                    .then(admin => {
                        if (admin) {
                            return res.send({success: true, token: generateToken(existingUser), isAdmin: true})
                        }
                        res.send({success: true, token: generateToken(existingUser), isAdmin: false})
                    })
            })
        })
        .catch(next)
}

const dealWithFB = (req, res, next) => {
    const FBData = req.body;
    const facebookUserId = FBData.userID;
    const facebookToken = FBData.accessToken;
    const facebookUserName = FBData.name.split(' ');
    User
        .findOne({
                'facebook.userID': {
                '$in': facebookUserId
            }
        }, (err, existingUser) => {
            if(err){next()}
            if(existingUser){
                AdminController
                    .checkAdminById(existingUser._id)
                    .then(admin => {
                        if (admin) {
                            return res.send({success: true, token: generateToken(existingUser), isAdmin: true})
                        }
                        res.send({success: true, token: generateToken(existingUser), isAdmin: false})
                    })
            }
            if(!existingUser){
                console.log('no user')
                const userData = {
                    name: {
                        first: facebookUserName[0],
                        last: facebookUserName[1]
                    },
                    avatar: FBData.picture.data.url,
                    email: {
                        data: FBData.email,
                        verified: true
                    },
                    facebook: {
                        userID: facebookUserId,
                        accessToken: facebookToken
                    }
                }
                User
                    .create(userData)
                    .then(savedUser => {
                        res.send({success: true, token: generateToken(savedUser), facebookSignUp: true})
                    })
                    .catch(next);
            }
        })
}

const signupWithFacebook = dealWithFB;
const signinWithFacebook = dealWithFB;

export default {
    signin,
    signup,
    signinWithFacebook,
    signupWithFacebook
}