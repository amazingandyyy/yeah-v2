import express from 'express';
import controller from './controller';
import auth from './auth';
import { loginRequired, readFile } from '../../middleware';
import multer from 'multer';

const router = express.Router();
// public request
router.post('/signup', auth.signup);
router.post('/signin', auth.signin);

// authorization required
router.use('/profile', loginRequired);

router.get('/profile', controller.getProfile);
router.post('/profile/avatar', readFile, controller.uploadAvatar);

export default router;
