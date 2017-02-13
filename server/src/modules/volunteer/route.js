import express from 'express';
import controller from './controller';
import { loginRequired, checkAdmin } from '../../middleware';

const router = express.Router();

// authorization required
router.post('/create', loginRequired, checkAdmin, controller.createOne);

// public request
router.get('/fetchAll', loginRequired, controller.fetchAll);
router.get('/fetchOne/:id', controller.fetchOne);
router.delete('/deleteOne/:id', loginRequired, checkAdmin, controller.deleteOne);
router.post('/updateOne/:id', loginRequired, checkAdmin, controller.updateOne);


export default router;
