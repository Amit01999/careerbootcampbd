import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import logger from '../config/logger.js';
import { uploadToS3 } from './s3Service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate PDF report for exam attempt
 */
export const generateExamReport = async (attempt, user, exam) => {
  try {
    const fileName = `exam-report-${attempt._id}-${uuidv4()}.pdf`;
    const filePath = path.join(__dirname, '../../uploads/temp', fileName);

    // Create PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
    });

    // Pipe to file
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Header
    doc
      .fontSize(20)
      .fillColor('#1a56db')
      .text('Private Bank Bootcamp', { align: 'center' })
      .moveDown(0.5);

    doc
      .fontSize(16)
      .fillColor('#000000')
      .text('Exam Performance Report', { align: 'center' })
      .moveDown(1);

    // Student Info
    doc
      .fontSize(12)
      .fillColor('#374151')
      .text(`Student: ${user.fullName}`, { continued: false })
      .text(`Email: ${user.email}`)
      .text(`Date: ${new Date(attempt.submittedAt).toLocaleDateString('en-GB')}`)
      .moveDown(1);

    // Exam Info
    doc
      .fontSize(14)
      .fillColor('#1f2937')
      .text('Exam Details', { underline: true })
      .moveDown(0.5);

    doc
      .fontSize(11)
      .fillColor('#374151')
      .text(`Exam: ${exam.title}`)
      .text(`Duration: ${exam.duration} minutes`)
      .text(`Time Taken: ${attempt.timeTaken} minutes`)
      .text(`Attempt Number: ${attempt.attemptNumber}`)
      .moveDown(1);

    // Score Summary Box
    doc
      .rect(50, doc.y, 500, 120)
      .fillAndStroke('#e0f2fe', '#0369a1');

    const boxY = doc.y + 10;

    doc
      .fontSize(14)
      .fillColor('#0c4a6e')
      .text('Score Summary', 60, boxY, { width: 480 })
      .moveDown(0.5);

    doc
      .fontSize(11)
      .fillColor('#1e40af')
      .text(`Total Questions: ${attempt.score.totalQuestions}`, 60)
      .text(`Attempted: ${attempt.score.attemptedQuestions}`)
      .text(`Correct Answers: ${attempt.score.correctAnswers}`)
      .text(`Incorrect Answers: ${attempt.score.incorrectAnswers}`)
      .text(`Skipped: ${attempt.score.skippedQuestions}`)
      .moveDown(0.5);

    doc
      .fontSize(16)
      .fillColor('#047857')
      .text(`Score: ${attempt.score.marksObtained}/${attempt.score.totalMarks} (${attempt.score.scorePercentage.toFixed(2)}%)`, 60);

    doc.moveDown(2);

    // Result Status
    if (attempt.score.isPassed) {
      doc
        .fontSize(14)
        .fillColor('#059669')
        .text('✓ PASSED', { align: 'center' });
    } else {
      doc
        .fontSize(14)
        .fillColor('#dc2626')
        .text('✗ FAILED', { align: 'center' });
    }

    doc.moveDown(1);

    // Subject-wise Analysis
    if (attempt.subjectWiseAnalysis && attempt.subjectWiseAnalysis.length > 0) {
      doc.addPage();

      doc
        .fontSize(14)
        .fillColor('#1f2937')
        .text('Subject-wise Performance', { underline: true })
        .moveDown(0.5);

      attempt.subjectWiseAnalysis.forEach((subject) => {
        doc
          .fontSize(11)
          .fillColor('#374151')
          .text(`${subject.subject.toUpperCase()}:`, { continued: true })
          .fillColor('#6b7280')
          .text(` ${subject.correctAnswers}/${subject.totalQuestions} (${subject.accuracy.toFixed(1)}%)`)
          .moveDown(0.3);

        // Progress bar
        const barWidth = 200;
        const barHeight = 10;
        const fillWidth = (subject.accuracy / 100) * barWidth;

        doc
          .rect(60, doc.y, barWidth, barHeight)
          .stroke('#d1d5db');

        doc
          .rect(60, doc.y - barHeight, fillWidth, barHeight)
          .fill(subject.accuracy >= 70 ? '#10b981' : subject.accuracy >= 50 ? '#f59e0b' : '#ef4444');

        doc.moveDown(1);
      });
    }

    // Footer
    doc
      .fontSize(8)
      .fillColor('#9ca3af')
      .text(
        'This is a computer-generated report from Private Bank Bootcamp',
        50,
        doc.page.height - 50,
        { align: 'center' },
      );

    // Finalize PDF
    doc.end();

    // Wait for file to be written
    await new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });

    // Upload to S3
    const s3Url = await uploadToS3(filePath, `reports/${fileName}`);

    // Clean up local file
    await fs.promises.unlink(filePath);

    return s3Url;
  } catch (error) {
    logger.error('Error generating PDF report:', error);
    throw error;
  }
};

export default {
  generateExamReport,
};
