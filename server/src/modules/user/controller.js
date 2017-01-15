const bcrypt = require('bcrypt-nodejs')

const token = require('../services').token;
const User = require('./model');

module.exports = {
    getOneUser: function(req, res) {
        const userId = req.query.userId;
        if(!userId){
            return res.status(401).send('missing required fields');
        }

        User.findById(userId, function(err, data){
            if (err || !data){ return res.status(401).send(err|| 'User not found')}
            const sendUser = data; // can hide some info here
            res.send(sendUser);
        })
    },

    checkAuthorization: function(req, res, next){
        const userId = req.query.userId;
        if(!userId){
            return res.status(401).send('missing required fields');
        }
        if(userId !== req.user.id){
            return res.status(401).send('NOT authorized!')
        }
        next()
    },

    getCurrentUser: function(req, res) {
        res.send(req.user)
    }

}