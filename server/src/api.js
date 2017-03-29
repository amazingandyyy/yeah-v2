import express from 'express';
const router = express.Router();

import { loginRequired } from './middleware';

import user from './modules/user/route';
import resource from './resource.route';
import assist from './modules/assist/route';
import task from './modules/task/route';
import upload from './modules/upload';

// GET ~/api
router.get('/', (req, res)=>{
  res.send('You are connected to yeah-server-api');
});

router.use('/user', user);
router.use('/assist', assist);

router.use('/resource', resource);
router.use('/task', task);

router.use('/upload', loginRequired, upload);

export default router;