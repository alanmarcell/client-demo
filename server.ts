import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import path from 'path';

import logFile from 'ptz-log-file';
const log = logFile({ dir: './logs' });
const env: string = process.env.NODE_ENV || 'developement';

const app = express();

log('starting server');

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use('/app', express.static(path.resolve(__dirname, '../client/app')));
app.use('/libs', express.static(path.resolve(__dirname, '../client/libs')));

// for system.js to work. Can be removed if bundling.
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.static(path.resolve(__dirname, '../../node_modules')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const renderIndex = (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
};

app.get('/*', renderIndex);

if (env === 'developement') {
  app.use((error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(error.status || 500);
    res.json({
      error,
      message: error.message
    });
  });
}

app.use((req: express.Request, res: express.Response, next) => {
  const error = new Error('Not Found');
  next(error);
});

app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: {},
    message: error.message
  });
});

(async () => {
  try {

    const server = http.createServer(app);

    app.listen(PORT, async () => {
     await server.address().port;
      console.log('This express angular app is listening on port:' + PORT);
    });
  } catch (e) {
    log(e);
  }
})();
