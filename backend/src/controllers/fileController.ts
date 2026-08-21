import { Response } from 'express';
import { File } from '../models/File.js';
import { AuthRequest } from '../middleware/auth.js';
import { extractTextFromFile, analyzeFileContent } from '../services/fileService.js';
import fs from 'fs';
import path from 'path';

export const uploadFile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { filename, path: filepath, mimetype, size, originalname } = req.file;

    // Extract text from file
    let extractedText = '';
    try {
      extractedText = await extractTextFromFile(filepath, mimetype);
    } catch (error) {
      console.error('Error extracting text:', error);
    }

    const file = new File({
      userId: req.userId,
      filename,
      originalName: originalname,
      mimetype,
      size,
      path: filepath,
      extractedText
    });

    await file.save();

    res.status(201).json({
      file: {
        id: file._id,
        filename: file.originalName,
        size: file.size,
        type: file.mimetype,
        uploadedAt: file.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'File upload failed' });
  }
};

export const analyzeFile = async (req: AuthRequest, res: Response) => {
  try {
    const { fileId } = req.body;

    const file = await File.findById(fileId);
    if (!file || file.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const analysis = await analyzeFileContent(file.extractedText || '');

    res.json({
      fileId: file._id,
      filename: file.originalName,
      analysis
    });
  } catch (error) {
    res.status(500).json({ error: 'File analysis failed' });
  }
};

export const getFileDetails = async (req: AuthRequest, res: Response) => {
  try {
    const { fileId } = req.params;

    const file = await File.findById(fileId);
    if (!file || file.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({
      file: {
        id: file._id,
        filename: file.originalName,
        size: file.size,
        type: file.mimetype,
        extractedText: file.extractedText,
        uploadedAt: file.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch file details' });
  }
};

export const deleteFile = async (req: AuthRequest, res: Response) => {
  try {
    const { fileId } = req.params;

    const file = await File.findById(fileId);
    if (!file || file.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Delete file from filesystem
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    await File.deleteOne({ _id: fileId });

    res.json({ message: 'File deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
};
