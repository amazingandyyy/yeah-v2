import express from 'express';
import controller from './controller';
import auth from './auth';
import { loginRequired, readFile } from '../../middleware';

const router = express.Router();
// public request
router.post('/signup', auth.signup);
router.post('/signin/email', auth.signin);
router.post('/signin/fb', auth.signinWithFacebook);

router.post('/helper/sendEmailToResetPassword/:email', auth.sendEmailToResetPassword);
router.post('/helper/verifyToken/:token', auth.verifyTokenCtrl);
router.post('/helper/resetPassword', auth.resetPassword);
// router.post('/helper/resetPassword', auth.sendEmailToResetPassword);

// authorization required
router.use('/profile', loginRequired);
router.delete('/permanentlyDeleteThisAcount', controller.permanentlyDeleteThisAcount);

router.get('/profile', controller.getProfile);
router.post('/profile/avatar', readFile, controller.uploadAvatar);
router.post('/profile/info', controller.uploadProfile);

export default router;