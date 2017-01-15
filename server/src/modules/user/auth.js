import bcrypt from 'bcrypt-nodejs';

import {generateToken} from '../services';
import User from './model';

export default {
    signup : (req, res, next) => {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if (!name || !email || !password) {
            return next()
        }
        User
            .create({name, email, password})
            .then(savedUser => {
                res.json({success: true, token: generateToken(savedUser)})
            })
            .catch(next);
    },

    signin : function (req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return next()
        }
        User
            .findOne({email: email})
            .select('+password')
            .then(existingUser => {
                bcrypt
                    .compare(password, existingUser.password, (err, good) => {
                        if (err || !good) {return next()}
                        res.send({
                            success: true,
                            token: generateToken(existingUser)
                        })
                    })
            })
            .catch(next)
    }
}