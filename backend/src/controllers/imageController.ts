import { Response } from 'express';
import { Image } from '../models/Image.js';
import { AuthRequest } from '../middleware/auth.js';
import { generateImage } from '../services/imageService.js';

export const generateImageFromPrompt = async (req: AuthRequest, res: Response) => {
  try {
    const { prompt, model = 'dall-e-3', size = '1024x1024' } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: 'Prompt cannot be empty' });
    }

    const imageUrl = await generateImage(prompt, model, size);

    const image = new Image({
      userId: req.userId,
      prompt,
      url: imageUrl,
      model,
      size
    });

    await image.save();

    res.status(201).json({
      image: {
        id: image._id,
        url: image.url,
        prompt: image.prompt,
        model: image.model,
        size: image.size,
        createdAt: image.createdAt
      }
    });
  } catch (error: any) {
    console.error('Image generation error:', error);
    res.status(500).json({ error: error.message || 'Image generation failed' });
  }
};

export const getImageDetails = async (req: AuthRequest, res: Response) => {
  try {
    const { imageId } = req.params;

    const image = await Image.findById(imageId);
    if (!image || image.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({
      image: {
        id: image._id,
        url: image.url,
        prompt: image.prompt,
        model: image.model,
        size: image.size,
        createdAt: image.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch image details' });
  }
};

export const getUserImages = async (req: AuthRequest, res: Response) => {
  try {
    const images = await Image.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      images: images.map(img => ({
        id: img._id,
        url: img.url,
        prompt: img.prompt,
        model: img.model,
        createdAt: img.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};
