import { Queue } from 'bullmq';
import redis from '../config/redis.js';
import logger from '../config/logger.js';

let questionFileQueue = null;
let pdfReportQueue = null;
let notificationQueue = null;

// Only create queues if Redis is available
if (redis) {
  questionFileQueue = new Queue('question-files', {
    connection: redis,
  });

  pdfReportQueue = new Queue('pdf-reports', {
    connection: redis,
  });

  notificationQueue = new Queue('notifications', {
    connection: redis,
  });
}

export { questionFileQueue, pdfReportQueue, notificationQueue };

/**
 * Add a job to a specific queue
 * @param {string} queueName - Name of the queue ('question-files', 'pdf-reports', 'notifications')
 * @param {object} data - Job data
 * @param {object} options - Job options (optional)
 * @returns {Promise<Job|null>} - The created job or null if Redis is not available
 */
export const addJobToQueue = async (queueName, data, options = {}) => {
  if (!redis) {
    logger.warn(`Queue operation skipped (Redis not configured): ${queueName}`);
    return null;
  }

  let queue;

  switch (queueName) {
    case 'question-files':
      queue = questionFileQueue;
      break;
    case 'pdf-reports':
      queue = pdfReportQueue;
      break;
    case 'notifications':
      queue = notificationQueue;
      break;
    default:
      throw new Error(`Unknown queue: ${queueName}`);
  }

  if (!queue) {
    logger.warn(`Queue not initialized: ${queueName}`);
    return null;
  }

  return await queue.add(queueName, data, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    ...options,
  });
};
