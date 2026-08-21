import express, { Router } from 'express';
import * as fileController from '../controllers/fileController.js';
import { authMiddleware } from '../middleware/auth.js';
import { upload } from '../middleware/fileUpload.js';

const router: Router = express.Router();

router.post('/upload', authMiddleware, upload.single('file'), fileController.uploadFile);
router.post('/analyze', authMiddleware, fileController.analyzeFile);
router.get('/:fileId', authMiddleware, fileController.getFileDetails);
router.delete('/:fileId', authMiddleware, fileController.deleteFile);

export default router;
