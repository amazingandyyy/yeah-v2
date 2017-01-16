import express from 'express';
import controller from './controller';
import auth from './auth';
import { loginRequired } from '../../middleware';

const router = express.Router();
// public request
router.post('/signup', auth.signup);
router.post('/signin', auth.signin);

// authorization required
router.get('/profile',  loginRequired, controller.getProfile);

module.exports = router;
