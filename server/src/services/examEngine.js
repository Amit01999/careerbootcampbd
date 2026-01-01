import { Question, Exam, ExamAttempt } from '../models/index.js';
import logger from '../config/logger.js';

/**
 * Generate questions for an exam attempt
 */
export const generateExamQuestions = async (examId, userId) => {
  try {
    const exam = await Exam.findById(examId);

    if (!exam) {
      throw new Error('Exam not found');
    }

    const allQuestions = [];

    // Generate questions for each section
    for (const section of exam.sections) {
      const questions = await Question.getRandomQuestions(
        {
          subject: section.subject,
          difficulty: section.difficulty === 'mixed' ? null : section.difficulty,
          tags: section.tags,
        },
        section.questionsCount,
      );

      if (questions.length < section.questionsCount) {
        logger.warn(`Not enough questions for section ${section.name}. Requested: ${section.questionsCount}, Found: ${questions.length}`);
      }

      allQuestions.push(...questions);
    }

    // Shuffle questions if enabled
    if (exam.settings.shuffleQuestions) {
      shuffleArray(allQuestions);
    }

    return allQuestions;
  } catch (error) {
    logger.error('Error generating exam questions:', error);
    throw error;
  }
};

/**
 * Create exam attempt
 */
export const createExamAttempt = async (examId, userId, questions) => {
  try {
    const exam = await Exam.findById(examId);

    if (!exam) {
      throw new Error('Exam not found');
    }

    // Check existing attempts
    const existingAttempts = await ExamAttempt.countDocuments({
      exam: examId,
      user: userId,
      status: { $in: ['submitted', 'auto_submitted'] },
    });

    if (exam.availability.maxAttempts > 0 && existingAttempts >= exam.availability.maxAttempts) {
      throw new Error('Maximum attempts reached for this exam');
    }

    // Create attempt
    const attempt = await ExamAttempt.create({
      exam: examId,
      user: userId,
      attemptNumber: existingAttempts + 1,
      questions: questions.map((q) => q._id),
      timeAllowed: exam.duration,
      expiresAt: new Date(Date.now() + exam.duration * 60 * 1000),
      status: 'in_progress',
      startedAt: new Date(),
    });

    return attempt;
  } catch (error) {
    logger.error('Error creating exam attempt:', error);
    throw error;
  }
};

/**
 * Submit exam attempt and calculate score
 */
export const submitExamAttempt = async (attemptId, answers) => {
  try {
    const attempt = await ExamAttempt.findById(attemptId).populate('questions exam');

    if (!attempt) {
      throw new Error('Attempt not found');
    }

    if (attempt.status !== 'in_progress') {
      throw new Error('Attempt already submitted or expired');
    }

    // Process answers
    const processedAnswers = [];

    attempt.questions.forEach((question, index) => {
      const userAnswer = answers.find((a) => a.questionId === question._id.toString());

      const isCorrect = userAnswer
        && userAnswer.selectedOption === question.correctAnswer;

      let marksObtained = 0;

      if (isCorrect) {
        marksObtained = question.marks || 1;
      } else if (userAnswer && userAnswer.selectedOption !== null) {
        // Wrong answer - apply negative marking if enabled
        const section = attempt.exam.sections.find((s) => s.subject === question.subject);
        if (section && section.negativeMarking.enabled) {
          marksObtained = -(section.negativeMarking.marksPerWrong || 0.25);
        }
      }

      processedAnswers.push({
        question: question._id,
        selectedOption: userAnswer?.selectedOption ?? null,
        isCorrect,
        marksObtained,
        timeTaken: userAnswer?.timeTaken || 0,
        isMarkedForReview: userAnswer?.isMarkedForReview || false,
        answeredAt: userAnswer?.answeredAt || null,
      });

      // Update question stats
      question.usageCount += 1;
      if (isCorrect) {
        question.correctAttempts += 1;
      } else if (userAnswer && userAnswer.selectedOption !== null) {
        question.incorrectAttempts += 1;
      }
      question.updateDifficultyScore();
      question.save().catch((err) => logger.error('Failed to update question stats:', err));
    });

    attempt.answers = processedAnswers;
    attempt.status = 'submitted';
    attempt.submittedAt = new Date();
    attempt.timeTaken = Math.round((attempt.submittedAt - attempt.startedAt) / 60000); // in minutes

    // Calculate scores
    attempt.calculateScore();
    attempt.calculateSubjectAnalysis();

    // Check pass/fail
    attempt.score.isPassed = attempt.score.marksObtained >= attempt.exam.passingMarks;

    await attempt.save();

    // Update exam and user stats (async, don't wait)
    Exam.updateStats(attempt.exam._id, attempt.score).catch((err) => logger.error('Failed to update exam stats:', err));

    const User = (await import('../models/index.js')).User;
    User.updateStats(attempt.user, attempt.score).catch((err) => logger.error('Failed to update user stats:', err));

    return attempt;
  } catch (error) {
    logger.error('Error submitting exam attempt:', error);
    throw error;
  }
};

/**
 * Auto-submit expired attempts
 */
export const autoSubmitExpiredAttempts = async () => {
  try {
    const expiredAttempts = await ExamAttempt.find({
      status: 'in_progress',
      expiresAt: { $lte: new Date() },
    });

    for (const attempt of expiredAttempts) {
      attempt.status = 'auto_submitted';
      attempt.submittedAt = new Date();
      attempt.timeTaken = attempt.timeAllowed;

      // Calculate score with existing answers (if any)
      attempt.calculateScore();
      attempt.calculateSubjectAnalysis();

      await attempt.save();

      logger.info(`Auto-submitted expired attempt: ${attempt._id}`);
    }

    return expiredAttempts.length;
  } catch (error) {
    logger.error('Error auto-submitting expired attempts:', error);
    throw error;
  }
};

/**
 * Shuffle array in place (Fisher-Yates algorithm)
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Sanitize questions for client (remove correct answers)
 */
export const sanitizeQuestionsForClient = (questions, shuffleOptions = false) => questions.map((q) => {
  const sanitized = {
    _id: q._id,
    questionText: q.questionText,
    questionTextBn: q.questionTextBn,
    questionType: q.questionType,
    subject: q.subject,
    marks: q.marks,
    imageUrl: q.imageUrl,
    options: q.options.map((opt) => ({
      text: opt.text,
      textBn: opt.textBn,
    })),
  };

  // Shuffle options if enabled
  if (shuffleOptions) {
    shuffleArray(sanitized.options);
  }

  return sanitized;
});

export default {
  generateExamQuestions,
  createExamAttempt,
  submitExamAttempt,
  autoSubmitExpiredAttempts,
  sanitizeQuestionsForClient,
};
