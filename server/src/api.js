import express from 'express';
import middleware from './middleware';
const router = express.Router();
import { loginRequired } from './middleware';

import user from './modules/user/route';
import volunteer from './modules/volunteer/route';
import resource from './resource.route';
import assist from './modules/assist/route';

router.get('/', function(req, res){ 
  res.send('You are connected to yeah-server-api');
});

router.use('/user', user);
router.use('/resource', resource);
router.use('/assist', assist);

export default router;