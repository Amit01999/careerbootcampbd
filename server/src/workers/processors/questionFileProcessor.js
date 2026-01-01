import { QuestionFile } from '../../models/index.js';
import { parsePDF, parseExcel } from '../../services/questionParser.js';
import logger from '../../config/logger.js';

export const processQuestionFileJob = async (job) => {
  const { fileId, filePath, fileType } = job.data;

  try {
    // Update status
    await QuestionFile.findByIdAndUpdate(fileId, {
      processingStatus: 'processing',
      processingStartedAt: new Date(),
    });

    let parsedData;

    // Parse based on file type
    if (fileType === 'pdf') {
      parsedData = await parsePDF(filePath);
    } else if (fileType === 'excel') {
      parsedData = await parseExcel(filePath);
    } else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }

    // Update question file with parsed data
    await QuestionFile.findByIdAndUpdate(fileId, {
      processingStatus: 'review',
      processingCompletedAt: new Date(),
      parsedData,
      pendingReviewCount: parsedData.totalQuestions,
    });

    logger.info(`Question file processed successfully: ${fileId}`);

    return {
      success: true,
      totalQuestions: parsedData.totalQuestions,
    };
  } catch (error) {
    logger.error(`Error processing question file ${fileId}:`, error);

    // Update status to failed
    await QuestionFile.findByIdAndUpdate(fileId, {
      processingStatus: 'failed',
      processingError: error.message,
    });

    throw error;
  }
};

export default processQuestionFileJob;
