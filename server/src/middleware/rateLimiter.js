import rateLimit from 'express-rate-limit';
import { errorResponse } from '../utils/response.js';

// General rate limiter
export const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    errorResponse(res, 'Too many requests, please try again later', 429);
  },
});

// Strict limiter for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  skipSuccessfulRequests: true,
  message: 'Too many login attempts, please try again later',
  handler: (req, res) => {
    errorResponse(res, 'Too many login attempts, please try again in 15 minutes', 429);
  },
});

// Limiter for file uploads
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 uploads per hour
  message: 'Too many file uploads, please try again later',
  handler: (req, res) => {
    errorResponse(res, 'Upload limit exceeded, please try again later', 429);
  },
});

// Limiter for exam attempts
export const examLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // 3 requests per minute
  message: 'Too many exam requests, please slow down',
  handler: (req, res) => {
    errorResponse(res, 'Too many requests, please wait a moment', 429);
  },
});

// Limiter for API calls
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
  message: 'API rate limit exceeded',
  handler: (req, res) => {
    errorResponse(res, 'API rate limit exceeded, please slow down', 429);
  },
});
