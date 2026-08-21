import express, { Router } from 'express';

const router: Router = express.Router();

// POST /api/chat/message
router.post('/message', (req, res) => {
  res.json({ message: 'Send chat message' });
});

// GET /api/chat/history/:chatId
router.get('/history/:chatId', (req, res) => {
  res.json({ message: 'Get chat history' });
});

// GET /api/chat/conversations
router.get('/conversations', (req, res) => {
  res.json({ message: 'Get all conversations' });
});

// DELETE /api/chat/:chatId
router.delete('/:chatId', (req, res) => {
  res.json({ message: 'Delete conversation' });
});

export default router;
