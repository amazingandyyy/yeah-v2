import express from 'express';
import { readFile } from '../../middleware';
import controller from './controller';

const router = express.Router();

// public request
router.post('/s3/:folder', readFile, controller.uploadFile);

export default router;