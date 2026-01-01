import { Worker } from 'bullmq';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import logger from '../config/logger.js';
import redis from '../config/redis.js';

// Load environment variables
dotenv.config();

// Export queue functions
export { addJobToQueue } from './queue.js';

// Only initialize workers if Redis is available
if (redis) {
  // Worker processors
  const { processQuestionFileJob } = await import('./processors/questionFileProcessor.js');
  const { processPdfReportJob } = await import('./processors/pdfReportProcessor.js');
  const { processNotificationJob } = await import('./processors/notificationProcessor.js');

  // Initialize database connection
  connectDB();

  // Question File Processing Worker
  const questionFileWorker = new Worker(
    'question-files',
    async (job) => {
      logger.info(`Processing question file job: ${job.id}`);
      return processQuestionFileJob(job);
    },
    {
      connection: redis,
      concurrency: 2,
    },
  );

  // PDF Report Generation Worker
  const pdfReportWorker = new Worker(
    'pdf-reports',
    async (job) => {
      logger.info(`Processing PDF report job: ${job.id}`);
      return processPdfReportJob(job);
    },
    {
      connection: redis,
      concurrency: 3,
    },
  );

  // Notification Worker
  const notificationWorker = new Worker(
    'notifications',
    async (job) => {
      logger.info(`Processing notification job: ${job.id}`);
      return processNotificationJob(job);
    },
    {
      connection: redis,
      concurrency: 5,
    },
  );

  // Worker event handlers
  const setupWorkerEvents = (worker, name) => {
    worker.on('completed', (job) => {
      logger.info(`${name} job ${job.id} completed`);
    });

    worker.on('failed', (job, err) => {
      logger.error(`${name} job ${job?.id} failed:`, err);
    });

    worker.on('error', (err) => {
      logger.error(`${name} worker error:`, err);
    });
  };

  setupWorkerEvents(questionFileWorker, 'Question File');
  setupWorkerEvents(pdfReportWorker, 'PDF Report');
  setupWorkerEvents(notificationWorker, 'Notification');

  logger.info('Workers started and listening for jobs');

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    logger.info('SIGTERM received. Closing workers...');
    await Promise.all([
      questionFileWorker.close(),
      pdfReportWorker.close(),
      notificationWorker.close(),
    ]);
    process.exit(0);
  });
} else {
  logger.info('Workers disabled (Redis not configured)');
}
