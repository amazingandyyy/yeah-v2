import User from './modules/user/model';
import { verifyToken } from './modules/services';
import multer from 'multer';
import adminController from './modules/admin/controller';

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
                return next();
            })
            .catch(next)
    })
};

const upload = multer({
  storage: multer.memoryStorage()
});

const readFile = upload.single('asset');

const checkAdmin = (req, res, next) => {
    const userId = req.user._id;
    if(!userId) res.status(401).send('admin need to login');
    adminController.checkAdminById(userId).then((user)=>{
        if(!user){
            return res.status(403).send({fail: 'you are not admin'})
        }
        next()
    })
    .catch(next);
}

export { loginRequired, readFile, checkAdmin };
