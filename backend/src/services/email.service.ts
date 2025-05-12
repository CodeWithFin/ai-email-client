import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export class EmailService {
  private gmail;
  
  constructor(oauthClient: OAuth2Client) {
    this.gmail = google.gmail({ version: 'v1', auth: oauthClient });
  }

  async listEmails(maxResults = 10) {
    const res = await this.gmail.users.messages.list({
      userId: 'me',
      maxResults,
    });
    
    return res.data.messages || [];
  }

  async getEmailDetails(messageId: string) {
    const res = await this.gmail.users.messages.get({
      userId: 'me',
      id: messageId,
      format: 'full',
    });
    
    return this.parseEmail(res.data);
  }

  private parseEmail(email: any) {
    const headers = email.payload.headers;
    const getHeader = (name: string) => 
      headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase())?.value;
    
    return {
      id: email.id,
      threadId: email.threadId,
      from: getHeader('From'),
      to: getHeader('To'),
      subject: getHeader('Subject'),
      date: getHeader('Date'),
      snippet: email.snippet,
      body: this.extractBody(email.payload),
      labels: email.labelIds || [],
    };
  }

  private extractBody(payload: any): string {
    if (payload.parts) {
      const textPart = payload.parts.find(
        (part: any) => part.mimeType === 'text/plain'
      );
      if (textPart) {
        return Buffer.from(textPart.body.data, 'base64').toString('utf-8');
      }
    }
    return Buffer.from(payload.body.data, 'base64').toString('utf-8');
  }
}