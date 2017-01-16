import express from 'express';
import controller from './controller';
import auth from './auth';
import {loginRequired} from '../../middleware';

const router = express.Router();
// public behavior
router.post('/signup', auth.signup);
router.post('/signin', auth.signin);

// login and authorization required
// router.use('/api', middleweare.loginRequired, controller.checkAuthorization);
// router.get('/api/getCurrentUser', controller.getCurrentUser);
router.get('/profile',  loginRequired, controller.getProfile);

module.exports = router;
