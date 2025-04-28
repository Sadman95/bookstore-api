import ApiError from '@/error-handlers/api-error';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';


// Global Error Handler Middleware
export const globalErrorHandler: ErrorRequestHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {

  if (!err) {
    next();
  }

  const statusCode = err.statusCode ?? 500;
  const message = err.message ?? 'Internal Server Error';

  // Handle validation errors
  if (err.errors && Array.isArray(err.errors)) {
    res.status(400).json({
      message: 'Validation failed',
      errors: err.errors.map((e) => ({
        field: e.type === 'field' ? e.path : undefined,
        message: e.msg,
      })),
    });
    return;
  }

  res.status(statusCode).json({
    message,
  });
};

// 404 Handler (Resource Not Found)
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
  });
};
