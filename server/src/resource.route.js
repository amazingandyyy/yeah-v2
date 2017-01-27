import express from 'express';
import middleware from './middleware';
const router = express.Router();
import { loginRequired } from './middleware';
import volunteer from './modules/volunteer/route';
import intership from './modules/intership/route';
import course from './modules/course/route';

router.use('/volunteer', volunteer);
router.use('/intership', intership);
router.use('/course', course);

export default router;