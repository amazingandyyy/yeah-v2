// ~/api/task/...

import express from 'express';
const router = express.Router();
import controller from './controller';
import { loginRequired, checkAdmin } from '../../middleware';

// Admin behavior
router.get('/fetchAll', loginRequired, checkAdmin, controller.fetchAll);

// Student/Admin behavior
router.get('/fetchOne/:id', loginRequired, controller.fetchOne);
router.post('/updateOne/:id', loginRequired, controller.updateOne);

router.get('/fetchAllOfOne', loginRequired, controller.fetchOne);

export default router;
