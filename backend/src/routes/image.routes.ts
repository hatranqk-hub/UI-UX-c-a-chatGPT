import express, { Router } from 'express';

const router: Router = express.Router();

// POST /api/images/generate
router.post('/generate', (req, res) => {
  res.json({ message: 'Generate image' });
});

// POST /api/images/edit
router.post('/edit', (req, res) => {
  res.json({ message: 'Edit image' });
});

// GET /api/images/:imageId
router.get('/:imageId', (req, res) => {
  res.json({ message: 'Get image details' });
});

export default router;
