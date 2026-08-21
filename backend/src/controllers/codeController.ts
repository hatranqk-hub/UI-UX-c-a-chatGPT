import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import { completeCode, explainCode, refactorCode } from '../services/codeService.js';

export const getCodeCompletion = async (req: AuthRequest, res: Response) => {
  try {
    const { code, language, context } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required' });
    }

    const completion = await completeCode(code, language, context);

    res.json({
      completion,
      language,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: 'Code completion failed' });
  }
};

export const explainCodeSnippet = async (req: AuthRequest, res: Response) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required' });
    }

    const explanation = await explainCode(code, language);

    res.json({
      explanation,
      language,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: 'Code explanation failed' });
  }
};

export const refactorCodeSnippet = async (req: AuthRequest, res: Response) => {
  try {
    const { code, language, improvements } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required' });
    }

    const refactored = await refactorCode(code, language, improvements);

    res.json({
      refactored,
      language,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: 'Code refactoring failed' });
  }
};
