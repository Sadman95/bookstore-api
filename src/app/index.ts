import { globalErrorHandler, notFoundHandler } from '@/middlewares/error.middleware';
import express, { Application, Request, Response } from 'express';
import path from 'path';


export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to the Bookstore API!');
});


// Global Error Handler
app.use(globalErrorHandler);

// 404 Handler
app.use(notFoundHandler);


