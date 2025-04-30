import ApiError from '@/error-handlers/api-error';
import sendResponse from '@/shared/send-response';
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

// Global Error Handler Middleware
export const globalErrorHandler: ErrorRequestHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('Global Error Handler:', err.stack);
  const statusCode = err.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message ?? 'Internal Server Error';

  // Handle validation errors (e.g., express-validator)
  if (Array.isArray(err.errors)) {
    const formattedErrors = err.errors.map((e) => ({
      message: e.msg,
      field: e.type === 'field' ? e.path : undefined,
    }));

    return sendResponse<ApiError>(res, {
      statusCode,
      success: false,
      message,
      errors: formattedErrors,
    });
  }

  // General error response
  return sendResponse<ApiError>(res, {
    statusCode,
    success: false,
    message,
  });
};

// 404 Handler (Resource Not Found)
export const notFoundHandler = (req: Request, res: Response, _next: NextFunction) => {
  sendResponse<ApiError>(res, {
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: 'Resource not found',
  });
};
