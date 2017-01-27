import jwt from 'jwt-simple';
import config from '../../config';
import moment from 'moment';

const generateToken = (user) => {
    const timeStamp = new Date().getTime();
    const payload = {
        sub: user._id,
        iat: timeStamp,
        exp: moment().add(7, 'days').unix()
    }
    return jwt.encode(payload, config.jwt_secret);
}
const verifyToken = (token, cb) => {
    console.log('token: ', token)
    const decode = jwt.decode(token, config.jwt_secret)
    if (!decode) {
        return cb({error: 'Token is not verified.'})
    }

    cb(null, decode)
}

export {generateToken, verifyToken};