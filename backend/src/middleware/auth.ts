import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    accessToken: string;
    refreshToken: string;
  };
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // In a real app, you'd validate JWT or session
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // For demo purposes, we'll just pass through the token
  req.user = {
    accessToken: authHeader.split(' ')[1],
    refreshToken: '', // Would get from DB in real app
  };

  next();
};