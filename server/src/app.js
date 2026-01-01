import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/error.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import logger from './config/logger.js';
import connectDB from './config/database.js';

// Load environment variables
dotenv.config();

// Database connection for serverless
// Vercel will reuse the connection across invocations
let isConnected = false;

const ensureDbConnection = async () => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
      logger.info('Database connected for serverless function');
    } catch (error) {
      logger.error('Database connection failed:', error);
      throw error;
    }
  }
};

// Initialize database connection
ensureDbConnection().catch(err => {
  logger.error('Failed to connect to database:', err);
});

const app = express();

// Trust proxy (for Railway, Render, etc.)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(hpp());

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }));
}

// Rate limiting
app.use('/api/', generalLimiter);

// Routes
app.use('/api/v1', routes);

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Private Bank Bootcamp API',
    version: '1.0.0',
    docs: '/api/v1/docs',
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
