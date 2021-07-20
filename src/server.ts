import dotenv from 'dotenv';
dotenv.config();

import express, { RequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import https from 'https';
import compression from 'compression';
import helmet from 'helmet';

import { initMongoDatabase } from './app/lib//utils/server/db';
import { handleGetAccount } from './server/account';
import { handlePostCheck } from './server/check';
import { handlePostDev } from './server/dev';
import { handlePostFeedback } from './server/feedback';
import { handleGetImg } from './server/img';
import { handlePostLogin } from './server/login';
import { handleGetMatches } from './server/matches';
import { handleGetMission } from './server/mission';
import { handleGetPublicAccount } from './server/public-account';
import { handleGetRankings } from './server/rankings';
import { handleGetSeasonAccount } from './server/season-account';
import { handleGetStats } from './server/stats';
import { handleGetStatus } from './server/status';
import { handleGetTrophyStats } from './server/trophy-stats';
import { handleGetVersion } from './server/version';

const { PORT = 3001 } = process.env;

const app = express();

// Use gzip compression
app.use(compression() as RequestHandler);

// Protect from some well-known web vulnerabilities
app.use(helmet());

// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// Middleware that parses Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(cookieParser() as RequestHandler);

// Middleware to set CORS headers.
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    req.hostname === 'localhost'
      ? 'http://localhost:3000'
      : `overwolf-extension://${process.env.OVERWOLF_EXTENSION_ID}`
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
  }
  next();
});

// Serve API requests from the router
app.get('/api/account', handleGetAccount);
app.post('/api/check', handlePostCheck);
app.post('/api/dev', handlePostDev);
app.post('/api/feedback', handlePostFeedback);
app.get('/api/champions/:championId/img', handleGetImg);
app.post('/api/login', handlePostLogin);
app.get('/api/matches', handleGetMatches);
app.get('/api/mission', handleGetMission);
app.get('/api/public-account', handleGetPublicAccount);
app.get('/api/rankings', handleGetRankings);
app.get('/api/season-account', handleGetSeasonAccount);
app.get('/api/stats', handleGetStats);
app.get('/api/status', handleGetStatus);
app.get('/api/trophy-stats/:name', handleGetTrophyStats);
app.get('/api/version', handleGetVersion);

initMongoDatabase().then(() => {
  console.log('Database connected');
  if (process.env.NODE_ENV === 'production') {
    app.listen(PORT, () => {
      console.log(`Production server listening at https://localhost:${PORT}`);
    });
  } else {
    const httpsServer = https.createServer(
      {
        key: fs.readFileSync('./certs/localhost.key'),
        cert: fs.readFileSync('./certs/localhost.crt'),
      },
      app
    );

    httpsServer.listen(PORT, () => {
      console.log(`Development server listening at https://localhost:${PORT}`);
    });
  }
});
