import { AuthenticatedRequest } from '../middleware/auth';
import { EmailService } from '../services/email.service';
import { google } from 'googleapis';

export const listEmails = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: req.user.accessToken,
    });
    
    const emailService = new EmailService(oauth2Client);
    const messages = await emailService.listEmails();
    
    // Get details for first 10 messages
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