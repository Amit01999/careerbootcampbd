import logger from '../config/logger.js';
import { errorResponse } from '../utils/response.js';

// Error handler for 404 - Not Found
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global error handler
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    user: req.user?._id,
  });

  // Handle specific error types
  let message = err.message;
  let status = statusCode;

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    status = 400;
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return errorResponse(res, 'Validation Error', status, errors);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    status = 400;
    const field = Object.keys(err.keyPattern)[0];
    message = `${field} already exists`;
    return errorResponse(res, message, status);
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    status = 400;
    message = `Invalid ${err.path}: ${err.value}`;
    return errorResponse(res, message, status);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Invalid token';
    return errorResponse(res, message, status);
  }

  if (err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Token expired';
    return errorResponse(res, message, status);
  }

  // Multer errors
  if (err.name === 'MulterError') {
    status = 400;
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File too large';
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      message = 'Unexpected file field';
    }
    return errorResponse(res, message, status);
  }

  // Default error response
  const response = {
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Server Error' : message,
  };

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
    response.error = err;
  }

  res.status(status).json(response);
};

// Async error wrapper
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default errorHandler;
