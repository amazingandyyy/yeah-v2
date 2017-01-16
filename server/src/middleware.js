import User from './modules/user/model';
import { verifyToken } from './modules/services';

const loginRequired = (req, res, next) => {
    
    if (!req.header('Authorization')) {
        return res
            .status(401)
            .send({message: 'Please make sure your request has an Authorization header.'})
    }
    // Validate jwt
    let token = req
        .header('Authorization')
        .split(' ')[0];
    verifyToken(token, function (err, payload) {
        if (err) { return next() }
        User
            .findById(payload.sub)
            .then(dbUser => {
                if (err || !dbUser) { return next() }
                req.user = dbUser;
                next();
            })
            .catch(next)
    })
};

export { loginRequired };