import express from 'express';
import controller from './controller';
import { loginRequired } from '../../middleware';

const router = express.Router();

// authorization required
router.post('/createResource', loginRequired, controller.createResource);

// public request
router.get('/fetchAll', controller.fetchAll);

module.exports = router;
