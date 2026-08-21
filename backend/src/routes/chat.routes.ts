import express, { Router } from 'express';
import * as chatController from '../controllers/chatController.js';
import { authMiddleware } from '../middleware/auth.js';

const router: Router = express.Router();

router.post('/message', authMiddleware, chatController.sendMessage);
router.get('/conversations', authMiddleware, chatController.getConversations);
router.get('/history/:chatId', authMiddleware, chatController.getConversationHistory);
router.delete('/:chatId', authMiddleware, chatController.deleteConversation);

export default router;
