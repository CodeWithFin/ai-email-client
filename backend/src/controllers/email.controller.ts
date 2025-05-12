import { Request, Response } from 'express';
import { google } from 'googleapis';
import { EmailService } from '../services/email.service';

export const listEmails = async (req: Request, res: Response) => {
  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: req.user.accessToken,
      refresh_token: req.user.refreshToken,
    });
    
    const emailService = new EmailService(oauth2Client);
    const messages = await emailService.listEmails();
    
    // Get details for each message
    const emails = await Promise.all(
      messages.slice(0, 10).map(msg => 
        emailService.getEmailDetails(msg.id!)
      )
    );
    
    res.json(emails);
  } catch (error) {
    console.error('Failed to fetch emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
};