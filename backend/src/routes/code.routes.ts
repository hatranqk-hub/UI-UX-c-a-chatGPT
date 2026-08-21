import express, { Router } from 'express';
import * as codeController from '../controllers/codeController.js';
import { authMiddleware } from '../middleware/auth.js';

const router: Router = express.Router();

router.post('/complete', authMiddleware, codeController.getCodeCompletion);
router.post('/explain', authMiddleware, codeController.explainCodeSnippet);
router.post('/refactor', authMiddleware, codeController.refactorCodeSnippet);

export default router;
