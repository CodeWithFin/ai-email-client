import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { googleAuthHandler, googleAuthCallbackHandler } from './controllers/auth.controller';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/auth/google', googleAuthHandler);
app.get('/api/auth/google/callback', googleAuthCallbackHandler);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});