import { Request, Response } from 'express';
import { getGoogleAuthUrl, getGoogleTokens } from '../services/auth.service';

export const googleAuthHandler = (req: Request, res: Response) => {
  const url = getGoogleAuthUrl();
  res.json({ url });
};

export const googleAuthCallbackHandler = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  try {
    const tokens = await getGoogleTokens(code);
    // In a real app, you'd save these tokens to your database
    res.json({ 
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
};