import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler } from './api/middleware/errorHandler';
import cookieParser from 'cookie-parser';

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors({
    origin: ['http://localhost:4200'],  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
    credentials: true  
  }));
  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());
  app.use(morgan('combined'));

  app.use(routes);
  app.use(errorHandler);

  return app;
};
