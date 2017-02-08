import express from 'express';
import middleware from './middleware';
const router = express.Router();
import { loginRequired } from './middleware';
import volunteer from './modules/volunteer/route';
import internship from './modules/internship/route';
import course from './modules/course/route';

router.use('/volunteer', volunteer);
router.use('/internship', internship);
router.use('/course', course);

export default router;