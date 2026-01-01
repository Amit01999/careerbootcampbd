import Redis from 'ioredis';
import logger from './logger.js';

let redis = null;

// Only connect to Redis if explicitly enabled via REDIS_URL
if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
    retryStrategy(times) {
      if (times > 3) {
        logger.warn('Redis connection failed after 3 attempts. Disabling Redis.');
        return null;
      }
      return Math.min(times * 50, 2000);
    },
  });

  redis.on('connect', () => {
    logger.info('Redis connected');
  });

  redis.on('error', () => {
    // Suppress errors - handled by retry strategy
  });

  redis.on('close', () => {
    // Silent
  });
} else {
  logger.info('Redis disabled. Set REDIS_URL environment variable to enable queue workers and caching.');
}

export default redis;
