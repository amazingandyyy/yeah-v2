import bcrypt from 'bcrypt-nodejs';

import { generateToken, verifyToken } from '../services';
import User from './model';
import AdminController from '../admin/controller';
import SES from 'node-ses';
import config from '../../config';
import jwt from 'jwt-simple';
import moment from 'moment';

const signup = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return next()
    };
    User
        .create(req.body)
        .then(savedUser => {
            res.send({success: true, token: generateToken(savedUser)})
        })
        .catch(next);
}

const signinWithEmail = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('password', password)
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
            console.log(existingUser)
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

const signinWithFacebook = (req, res, next) => {
    const FBData = req.body;
    // console.log('FBData: ', FBData)
    const facebookUserId = FBData.userID;
    const facebookToken = FBData.accessToken;
    // console.log('FBData.name:', FBData.name)
    const facebookUserName = FBData.name.split(' ');
    // console.log('facebookUserName :', facebookUserName)
    User.findOne({
        'facebook.userID': {
            '$in': facebookUserId
        }
    }).then(existingUser => {
        if (existingUser) {
            console.log('there is user with this fb id', existingUser);
            if(!existingUser.avatar){
                existingUser.avatar = FBData.picture.data.url;
            }
            existingUser.save()
            .then(() => {
                AdminController.checkAdminById(existingUser._id)
                .then(admin => {
                    if (admin) {
                        return res.send({success: true, token: generateToken(existingUser), isAdmin: true})
                    }
                    res.send({success: true, token: generateToken(existingUser), isAdmin: false})
                }).catch(next);
            }).catch(next);
        }
        if (!existingUser) {
            // console.log('no user with this fb id');
            // find User by email
            User
            .findOne({
                'email.data': {
                    '$in': FBData.email
                }
            })
            .then(dbUser => {
                if(dbUser){
                    // console.log('has user with this fb email');
                    dbUser.facebook = {
                        userID: facebookUserId,
                        accessToken: facebookToken
                    }
                    if(!dbUser.avatar) {
                        dbUser.avatar = FBData.picture.data.url
                    }
                    dbUser.save().then(()=>{
                        AdminController
                        .checkAdminById(dbUser._id)
                        .then(admin => {
                            if (admin) {
                                return res.send({success: true, token: generateToken(dbUser), isAdmin: true})
                            }
                            res.send({success: true, token: generateToken(dbUser), isAdmin: false})
                        }).catch(next);
                    }).catch(next);
                }
                if(!dbUser){
                    // console.log('no user with this fb email then create a total new user');
                    const userData = {
                        name: {
                            first: facebookUserName[0] || '',
                            last: facebookUserName[1] || ''
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
                    };
                    return res.send({passwordNeed: true, userData});
                }
                })
                .catch(next)
        }
    }).catch(next)
}

const sendEmailToResetPassword = (req, res, next) => {
    const userEmail = req.params.email;
    User
        .findOne({
        'email.data': {
            '$in': userEmail
        }
    })
        .then(existingUser => {
            if (!existingUser) {
                return res
                    .status(404)
                    .send({type: 'EMAIL_NOT_FOUND', redirectTo: 'signup'})
            };
            if (existingUser) {
                const token = generateToken2(existingUser);
                const EmailService = SES.createClient({
                        key: config.aws_id,
                        secret: config.aws_secret
                    })
                const resetURI = `${config.redirect_url_base}/#/auth/resetpassword/${token}`;

                EmailService.sendEmail({
                    to: userEmail,
                    from: config.aws_ses_sender,
                    subject: 'YEAH Password Reset',
                    message: `<h2>Password Reset: </h2> <br/> <a>${resetURI}</a>`
                }, (err, data) => {
                    if(err){
                        console.log(err)
                        return next()
                    }
                    res.send({type: 'EMAIL_SEND', status: true})
                });
            }
        })
        .catch(next)
}

const verifyTokenCtrl = (req, res, next) => {
    // console.log('token: ', req.params.token)
    const { token } = req.params;
    verifyToken2(token, (err, payload) => {
        if (err) { return next() }
        User
            .findById(payload.sub)
            .then(dbUser => {
                if (err || !dbUser) { return next() }
                res.send({verified: true})
            })
            .catch(next)
    })
}
const generateToken2 = (user) => {
    const timeStamp = new Date().getTime();
    const payload = {
        sub: user._id,
        iat: timeStamp,
        exp: moment().add(12, 'hours').unix()
    }
    return jwt.encode(payload, config.jwt_secret+config.unique_salt);
}
const verifyToken2 = (token, cb) => {
    const decode = jwt.decode(token, config.jwt_secret+config.unique_salt)
    if (!decode) {
        return cb({error: 'Token is not verified.'})
    }
    cb(null, decode)
}

const resetPassword = (req, res, next) => {
    const { token, password } = req.body;

    verifyToken2(token, (err, payload) => {
        if (err) { return next() }
        User
            .findById(payload.sub)
            .select('+password')
            .then(dbUser => {
                if (err || !dbUser) { return next() }
                dbUser.password = password;
                return dbUser.save()
            })
            .then(savedUser => {
                console.log('savedUser: ', savedUser);
                res.send({reset: true})
            })
            .catch(next)
    })
}

export default {
    signinWithEmail,
    signup,
    signinWithFacebook,
    sendEmailToResetPassword,
    verifyTokenCtrl,
    resetPassword
}