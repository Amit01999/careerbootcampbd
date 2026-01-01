import { Exam, ExamAttempt, Payment } from '../models/index.js';
import {
  generateExamQuestions,
  createExamAttempt,
  submitExamAttempt,
  sanitizeQuestionsForClient,
} from '../services/examEngine.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { asyncHandler } from '../middleware/error.js';
import logger from '../config/logger.js';

// @desc    Get all published exams
// @route   GET /api/v1/exams
// @access  Public
export const getExams = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    examType,
    category,
    isFree,
    search,
  } = req.query;

  const query = {
    'availability.isPublished': true,
    isActive: true,
  };

  if (examType) query.examType = examType;
  if (category) query.category = category;
  if (isFree !== undefined) query['pricing.isFree'] = isFree === 'true';
  if (search) {
    query.$or = [
      { title: new RegExp(search, 'i') },
      { titleBn: new RegExp(search, 'i') },
      { tags: new RegExp(search, 'i') },
    ];
  }

  const exams = await Exam.find(query)
    .select('-sections.tags -settings -createdBy -updatedBy')
    .sort({ createdAt: -1 })
    .limit(parseInt(limit, 10))
    .skip((parseInt(page, 10) - 1) * parseInt(limit, 10));

  const total = await Exam.countDocuments(query);

  paginatedResponse(
    res,
    exams,
    {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      total,
    },
    'Exams retrieved successfully',
  );
});

// @desc    Get exam by ID or slug
// @route   GET /api/v1/exams/:idOrSlug
// @access  Public
export const getExam = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  const exam = await Exam.findOne({
    $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
    'availability.isPublished': true,
    isActive: true,
  }).select('-createdBy -updatedBy');

  if (!exam) {
    return errorResponse(res, 'Exam not found', 404);
  }

  // Check if user has purchased (if logged in)
  let hasPurchased = false;
  if (req.userId && !exam.pricing.isFree) {
    hasPurchased = await Payment.hasPurchased(req.userId, exam._id);
  }

  successResponse(res, { exam, hasPurchased }, 'Exam retrieved successfully');
});

// @desc    Start exam attempt
// @route   POST /api/v1/exams/:examId/start
// @access  Private
export const startExam = asyncHandler(async (req, res) => {
  const { examId } = req.params;

  const exam = await Exam.findById(examId);

  if (!exam || !exam.availability.isPublished || !exam.isActive) {
    return errorResponse(res, 'Exam not found or not available', 404);
  }

  // Check if exam requires payment
  if (!exam.pricing.isFree) {
    const hasPurchased = await Payment.hasPurchased(req.userId, examId);

    if (!hasPurchased) {
      return errorResponse(res, 'You must purchase this exam before taking it', 403);
    }
  }

  // Check for existing in-progress attempt
  const existingAttempt = await ExamAttempt.findOne({
    exam: examId,
    user: req.userId,
    status: 'in_progress',
  });

  if (existingAttempt) {
    // Resume existing attempt
    const questions = await exam.populate({
      path: 'questions',
      select: 'questionText questionTextBn options subject difficulty marks',
    });

    const sanitizedQuestions = sanitizeQuestionsForClient(
      existingAttempt.questions,
      exam.settings.shuffleOptions,
    );

    return successResponse(res, {
      attemptId: existingAttempt._id,
      questions: sanitizedQuestions,
      timeRemaining: Math.max(0, Math.floor((existingAttempt.expiresAt - new Date()) / 1000)),
      expiresAt: existingAttempt.expiresAt,
    }, 'Resuming existing attempt');
  }

  // Generate questions
  const questions = await generateExamQuestions(examId, req.userId);

  if (questions.length === 0) {
    return errorResponse(res, 'Not enough questions available for this exam', 500);
  }

  // Create attempt
  const attempt = await createExamAttempt(examId, req.userId, questions);

  // Sanitize questions (remove correct answers)
  const sanitizedQuestions = sanitizeQuestionsForClient(
    questions,
    exam.settings.shuffleOptions,
  );

  logger.info(`Exam attempt started: ${attempt._id} by user ${req.userId}`);

  successResponse(
    res,
    {
      attemptId: attempt._id,
      exam: {
        _id: exam._id,
        title: exam.title,
        duration: exam.duration,
        totalQuestions: exam.totalQuestions,
        totalMarks: exam.totalMarks,
      },
      questions: sanitizedQuestions,
      timeAllowed: exam.duration,
      expiresAt: attempt.expiresAt,
      settings: {
        allowReview: exam.settings.allowReview,
        allowSkip: exam.settings.allowSkip,
        preventTabSwitch: exam.settings.preventTabSwitch,
      },
    },
    'Exam started successfully',
    201
  );
});

// @desc    Save exam progress (autosave)
// @route   PUT /api/v1/exams/attempts/:attemptId/save
// @access  Private
export const saveProgress = asyncHandler(async (req, res) => {
  const { attemptId } = req.params;
  const { answers } = req.body;

  const attempt = await ExamAttempt.findOne({
    _id: attemptId,
    user: req.userId,
    status: 'in_progress',
  });

  if (!attempt) {
    return errorResponse(res, 'Attempt not found or already submitted', 404);
  }

  // Save partial answers
  attempt.answers = answers.map((ans) => ({
    question: ans.question || ans.questionId,
    selectedOption: ans.selectedOption,
    isMarkedForReview: ans.isMarkedForReview || false,
    answeredAt: ans.answeredAt || new Date(),
  }));

  await attempt.save();

  successResponse(res, null, 'Progress saved successfully');
});

// @desc    Submit exam attempt
// @route   POST /api/v1/exams/attempts/:attemptId/submit
// @access  Private
export const submitExam = asyncHandler(async (req, res) => {
  const { attemptId } = req.params;
  const { answers } = req.body;

  const attempt = await ExamAttempt.findOne({
    _id: attemptId,
    user: req.userId,
  });

  if (!attempt) {
    return errorResponse(res, 'Attempt not found', 404);
  }

  if (attempt.status !== 'in_progress') {
    return errorResponse(res, 'Attempt already submitted', 400);
  }

  // Submit and calculate score
  const result = await submitExamAttempt(attemptId, answers);

  logger.info(`Exam submitted: ${attemptId} - Score: ${result.score.scorePercentage}%`);

  // Queue PDF generation (handled by worker)
  // This will be processed in the background

  const exam = await Exam.findById(result.exam);

  successResponse(res, {
    attemptId: result._id,
    score: result.score,
    subjectAnalysis: result.subjectWiseAnalysis,
    isPassed: result.score.isPassed,
    timeTaken: result.timeTaken,
    showAnswers: exam.settings.showCorrectAnswers,
  }, 'Exam submitted successfully');
});

// @desc    Get attempt result
// @route   GET /api/v1/exams/attempts/:attemptId/result
// @access  Private
export const getAttemptResult = asyncHandler(async (req, res) => {
  const { attemptId } = req.params;

  const attempt = await ExamAttempt.findOne({
    _id: attemptId,
    user: req.userId,
  }).populate({
    path: 'exam',
    select: 'title titleBn duration totalMarks passingMarks settings',
  }).populate({
    path: 'questions',
    select: 'questionText questionTextBn options correctAnswer explanation explanationBn subject difficulty',
  });

  if (!attempt) {
    return errorResponse(res, 'Attempt not found', 404);
  }

  if (attempt.status === 'in_progress') {
    return errorResponse(res, 'Exam is still in progress', 400);
  }

  // Build response with flattened structure for frontend
  const totalQuestions = attempt.questions?.length || 0;
  const correctAnswers = attempt.answers?.filter((ans) => ans.isCorrect).length || 0;
  const wrongAnswers = attempt.answers?.filter((ans) => !ans.isCorrect && ans.selectedOption !== undefined).length || 0;
  const unanswered = totalQuestions - (correctAnswers + wrongAnswers);

  const response = {
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    unanswered,
    score: attempt.score?.totalScore || 0,
    percentage: attempt.score?.scorePercentage || 0,
    passed: attempt.score?.isPassed || false,
    timeTaken: attempt.timeTaken || 0,
    subjectAnalysis: attempt.subjectWiseAnalysis || {},
    difficultyAnalysis: attempt.difficultyAnalysis || {},
    reportPdfUrl: attempt.reportPdfUrl,
    autoSubmitted: attempt.status === 'auto_submitted',
  };

  // Include detailed answers if exam settings allow
  if (attempt.exam.settings.showCorrectAnswers) {
    response.answers = attempt.answers.map((ans, index) => {
      const question = attempt.questions[index];

      return {
        question: {
          _id: question._id,
          questionText: question.questionText,
          questionTextBn: question.questionTextBn,
          options: question.options,
          correctAnswer: question.correctAnswer,
          explanation: attempt.exam.settings.showExplanations ? question.explanation : null,
          explanationBn: attempt.exam.settings.showExplanations ? question.explanationBn : null,
          subject: question.subject,
          difficulty: question.difficulty,
        },
        selectedOption: ans.selectedOption,
        isCorrect: ans.isCorrect,
        marksObtained: ans.marksObtained,
      };
    });
  }

  successResponse(res, response, 'Result retrieved successfully');
});

// @desc    Get user's attempt history
// @route   GET /api/v1/exams/my-attempts
// @access  Private
export const getMyAttempts = asyncHandler(async (req, res) => {
  const {
    page = 1, limit = 10, examId, status = 'submitted',
  } = req.query;

  const history = await ExamAttempt.getUserHistory(req.userId, {
    limit: parseInt(limit, 10),
    skip: (parseInt(page, 10) - 1) * parseInt(limit, 10),
    examId,
    status,
  });

  const total = await ExamAttempt.countDocuments({
    user: req.userId,
    status,
    ...(examId && { exam: examId }),
  });

  paginatedResponse(res, history, {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    total,
  }, 'Attempt history retrieved successfully');
});

// @desc    Get exam leaderboard
// @route   GET /api/v1/exams/:examId/leaderboard
// @access  Public
export const getLeaderboard = asyncHandler(async (req, res) => {
  const { examId } = req.params;
  const { limit = 10 } = req.query;

  const leaderboard = await ExamAttempt.getLeaderboard(examId, {
    limit: parseInt(limit, 10),
  });

  successResponse(res, { leaderboard }, 'Leaderboard retrieved successfully');
});

// @desc    Get user dashboard statistics
// @route   GET /api/v1/exams/dashboard/stats
// @access  Private
export const getDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.userId;

  // Get all submitted attempts for the user
  const attempts = await ExamAttempt.find({
    user: userId,
    status: 'submitted',
  })
    .populate('exam', 'title passingMarks totalMarks')
    .sort({ submittedAt: -1 })
    .lean();

  // Calculate statistics
  const totalAttempts = attempts.length;

  // Calculate average score (using score.scorePercentage)
  const totalScore = attempts.reduce((sum, attempt) => {
    return sum + (attempt.score?.scorePercentage || 0);
  }, 0);
  const averageScore = totalAttempts > 0 ? Math.round(totalScore / totalAttempts) : 0;

  const totalTime = attempts.reduce((sum, attempt) => sum + (attempt.timeTaken || 0), 0);

  // Subject-wise performance
  const subjectStats = {};
  attempts.forEach((attempt) => {
    if (attempt.subjectWiseAnalysis) {
      Object.entries(attempt.subjectWiseAnalysis).forEach(([subject, data]) => {
        if (!subjectStats[subject]) {
          subjectStats[subject] = { total: 0, correct: 0, count: 0 };
        }
        subjectStats[subject].total += data.total || 0;
        subjectStats[subject].correct += data.correct || 0;
        subjectStats[subject].count += 1;
      });
    }
  });

  const subjectPerformance = Object.entries(subjectStats).map(([subject, data]) => ({
    subject,
    score: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
  }));

  // Recent attempts (last 5)
  const recentAttempts = attempts.slice(0, 5).map((attempt) => ({
    id: attempt._id,
    name: attempt.exam?.title || 'Unknown Exam',
    date: attempt.submittedAt || attempt.createdAt,
    score: attempt.score?.totalScore || 0,
    total: attempt.exam?.totalMarks || 100,
    status: attempt.score?.isPassed ? 'Passed' : 'Failed',
  }));

  // Performance over time (last 10 attempts)
  const performanceData = attempts
    .slice(-10)
    .reverse()
    .map((attempt, index) => ({
      name: `Exam ${index + 1}`,
      score: attempt.score?.scorePercentage || 0,
    }));

  const stats = {
    totalAttempts,
    averageScore,
    totalStudyHours: Math.round(totalTime / 60), // Convert seconds to hours
    subjectsCount: Object.keys(subjectStats).length,
    performanceData,
    subjectPerformance,
    recentAttempts,
  };

  successResponse(res, stats, 'Dashboard statistics retrieved successfully');
});

export default {
  getExams,
  getExam,
  startExam,
  saveProgress,
  submitExam,
  getAttemptResult,
  getMyAttempts,
  getLeaderboard,
  getDashboardStats,
};
