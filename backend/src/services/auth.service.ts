import { Request, Response } from 'express';
import axios from 'axios';

const GOOGLE_OAUTH_CONFIG = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
};

export const getGoogleAuthUrl = () => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
    client_id: GOOGLE_OAUTH_CONFIG.clientId,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://mail.google.com/',
    ].join(' '),
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
};

export const getGoogleTokens = async (code: string) => {
  const url = 'https://oauth2.googleapis.com/token';
  const values = {
    code,
    client_id: GOOGLE_OAUTH_CONFIG.clientId,
    client_secret: GOOGLE_OAUTH_CONFIG.clientSecret,
    redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
    grant_type: 'authorization_code',
  };

  const res = await axios.post(url, new URLSearchParams(values), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return res.data;
};