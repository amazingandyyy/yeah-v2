import express from 'express';
import middleware from './middleware';
const router = express.Router();

import user from './modules/user/route';

router.get('/', function(req, res){ 
  res.send('You are connected to yeah-server-api');
});

router.use('/user', user);

export default router;