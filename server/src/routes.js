import express from 'express';
import middleware from './middleware';
const router = express.Router();

router.get('/', function(req, res){ 
  res.send('year-server docs: https://gist.github.com/amazingandyyy/3801e5d2da49ab191f4567bfa7ebb06c');
});

router.use('/user', require('./modules/user/route'));

export default router;