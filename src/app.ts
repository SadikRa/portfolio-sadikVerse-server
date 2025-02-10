/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRouters } from './app/models/users/User.Route';
import { blogRoutes } from './app/models/blog/blog.router';
import { projectRoutes } from './app/models/projects/project.router';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cookieParser());

// CORS
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Application routes

//users
app.use('/api/users', UserRouters);
//blogs
app.use('/api', blogRoutes);
//
app.use('/api', projectRoutes);

// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello Sadik !');
});

export default app;
