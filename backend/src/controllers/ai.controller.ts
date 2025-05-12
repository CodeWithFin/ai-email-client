import { Request, Response } from 'express';
import { AIService } from '../services/ai.service';

export const getResponseSuggestions = async (req: Request, res: Response) => {
  try {
    const { emailContent, context } = req.body;
    
    if (!emailContent) {
      return res.status(400).json({ error: 'emailContent is required' });
    }

    const suggestions = await AIService.generateResponseSuggestions(emailContent, context);
    res.json({ suggestions });
  } catch (error) {
    console.error('Failed to generate suggestions:', error);
    res.status(500).json({ error: 'Failed to generate suggestions' });
  }
};