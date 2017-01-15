import express from 'express';
import controller from './controller';
import auth from './auth';
import middleweare from '../../middleware';

const router = express.Router();
// public behavior
router.post('/signup', auth.signup);
router.post('/signin', auth.signin);
// router.get('/getOneUser', controller.getOneUser);

// login and authorization required
// router.use('/api', middleweare.loginRequired, controller.checkAuthorization);
// router.get('/api/getCurrentUser', controller.getCurrentUser);

module.exports = router;
