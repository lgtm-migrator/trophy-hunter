import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import https from 'https';

import { initMongoDatabase } from './api/utils/server/db';
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

// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// Middleware that parses Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(cookieParser());

// Middleware to set CORS headers.
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    `overwolf-extension://${process.env.OVERWOLF_EXTENSION_ID}`
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

const httpsServer = https.createServer(
  {
    key: fs.readFileSync('./certs/localhost.key'),
    cert: fs.readFileSync('./certs/localhost.crt'),
  },
  app
);

initMongoDatabase().then(() => {
  console.log('Database connected');
  httpsServer.listen(PORT, () => {
    console.log(`Server listening at https://localhost:${PORT}`);
  });
});
