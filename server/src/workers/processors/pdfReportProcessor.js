import { ExamAttempt, User } from '../../models/index.js';
import { generateExamReport } from '../../services/pdfGenerator.js';
import logger from '../../config/logger.js';

export const processPdfReportJob = async (job) => {
  const { attemptId } = job.data;

  try {
    // Get attempt with populated data
    const attempt = await ExamAttempt.findById(attemptId)
      .populate('exam')
      .populate('user');

    if (!attempt) {
      throw new Error('Attempt not found');
    }

    // Generate PDF
    const pdfUrl = await generateExamReport(attempt, attempt.user, attempt.exam);

    // Update attempt with PDF URL
    attempt.reportPdfUrl = pdfUrl;
    await attempt.save();

    logger.info(`PDF report generated for attempt: ${attemptId}`);

    return {
      success: true,
      pdfUrl,
    };
  } catch (error) {
    logger.error(`Error generating PDF report for attempt ${attemptId}:`, error);
    throw error;
  }
};

export default processPdfReportJob;
