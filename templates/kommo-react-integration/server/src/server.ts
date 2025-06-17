import fs from 'fs/promises';
import path from 'path';

import dotenv from 'dotenv';

import axios from 'axios';

import express, { Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';

import { SalesbotRequestBody, JwtData, DPRequestBody } from './server.types';

dotenv.config();

const app = express();
const PORT = 3000;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SUBDOMAIN = process.env.SUBDOMAIN;
const REDIRECT_URI = process.env.REDIRECT_URI;

if (!CLIENT_ID || !CLIENT_SECRET || !SUBDOMAIN) {
  const missing = [];

  if (!CLIENT_ID) {
    missing.push('CLIENT_ID');
  }

  if (!CLIENT_SECRET) {
    missing.push('CLIENT_SECRET');
  }

  if (!SUBDOMAIN) {
    missing.push('SUBDOMAIN');
  }

  const errorText = chalk.red(
    `Missing required environment variables: ${missing.join(', ')}`
  );

  console.error(new Error(errorText));

  process.exit(1);
}

const TOKEN_FILE = path.resolve(__dirname, 'kommo_token.json');

// For demonstration purposes, we store the token in a local JSON file.
// In production, use a secure storage method such as a database.
const saveToken = async (data: any) => {
  await fs.writeFile(TOKEN_FILE, JSON.stringify(data, null, 2));
};

const loadToken = async (): Promise<any | null> => {
  try {
    const data = await fs.readFile(TOKEN_FILE, 'utf-8');

    return JSON.parse(data);
  } catch {
    return null;
  }
};

const refreshTokenIfNeeded = async (): Promise<string> => {
  const tokens = await loadToken();

  if (!tokens) {
    throw new Error('Token not found.');
  }

  const now = Math.floor(Date.now() / 1000);
  const isExpired = tokens.expires_at <= now;

  if (!isExpired) {
    return tokens.access_token;
  }

  const response = await axios.post(
    `https://${SUBDOMAIN}.kommo.com/oauth2/access_token`,
    {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: tokens.refresh_token,
      // @todo why do we need it?
      redirect_uri: REDIRECT_URI,
    }
  );

  const newData = response.data;

  newData.expires_at = now + newData.expires_in;

  await saveToken(newData);

  return newData.access_token;
};

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post(
  '/webhook_salesbot',
  async (
    req: Request<unknown, unknown, SalesbotRequestBody>,
    res: Response
  ): Promise<void> => {
    const { token, return_url: returnUrl } = req.body;

    if (!token || !returnUrl) {
      res.status(400).json({
        status: 'error',
        message: 'token and return_url are required',
      });

      return;
    }

    try {
      const decoded = jwt.verify(token, CLIENT_SECRET, {
        ignoreNotBefore: true,
      }) as JwtData;

      console.log('Incoming Salesbot hook triggered:', {
        body: req.body,

        decodedToken: decoded,
      });
    } catch (error) {
      console.error('JWT verification failed:', error);

      res.status(401).json({ status: 'error', message: 'Invalid token' });

      return;
    }

    res.sendStatus(200);

    try {
      const accessToken = await refreshTokenIfNeeded();

      await axios.post(
        returnUrl,
        { data: { status: 'success' } },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Failed to call return_url:',
          error.response?.status,
          error.response?.data
        );
      } else {
        console.error('Failed to call return_url:', error);
      }
    }
  }
);

app.post(
  '/webhook_dp',
  (req: Request<unknown, unknown, DPRequestBody>, res: Response): void => {
    const {
      event: { type_code: eventType, data },
      action,
    } = req.body;

    console.log('Incoming DP hook triggered:', eventType, data);

    const message = action?.settings?.widget?.settings?.message;

    console.log('Configured message from widget:', message);

    res.sendStatus(200);
  }
);

app.get('/widget_auth', async (req, res) => {
  const code = req.query.code;

  if (!code || typeof code !== 'string') {
    res.status(400).send('Missing code');

    return;
  }

  try {
    const response = await axios.post(
      `https://${SUBDOMAIN}.kommo.com/oauth2/access_token`,
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        // @todo why do we need it?
        redirect_uri: REDIRECT_URI,
      }
    );

    const data = response.data;

    data.expires_at = Math.floor(Date.now() / 1000) + data.expires_in;

    await saveToken(data);

    res.send('Auth complete. Token saved.');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
    } else if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }

    res.status(500).send('Error');
  }
});

app.get('/', (_req, res) => {
  res.send('This is how your widget might appear in the mobile application.');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
