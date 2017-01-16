import User from './model';

export default {
    getProfile: function(req, res, next) {
        if(!req.user){return res.status(404).send('No user available')}
        res.send(req.user);
    }
};
