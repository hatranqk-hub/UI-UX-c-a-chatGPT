import express, { Router } from 'express';
import * as imageController from '../controllers/imageController.js';
import { authMiddleware } from '../middleware/auth.js';

const router: Router = express.Router();

router.post('/generate', authMiddleware, imageController.generateImageFromPrompt);
router.get('/:imageId', authMiddleware, imageController.getImageDetails);
router.get('/', authMiddleware, imageController.getUserImages);

export default router;
