import express from 'express';
import * as examController from '../controllers/examController.js';
import { protect, optionalAuth } from '../middleware/auth.js';
import { examLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public routes (with optional auth)
router.get('/', optionalAuth, examController.getExams);

// Protected routes
router.get('/dashboard/stats', protect, examController.getDashboardStats);
router.get('/my-attempts', protect, examController.getMyAttempts);
router.post('/:examId/start', protect, examLimiter, examController.startExam);
router.put('/attempts/:attemptId/save', protect, examController.saveProgress);
router.post('/attempts/:attemptId/submit', protect, examController.submitExam);
router.get('/attempts/:attemptId/result', protect, examController.getAttemptResult);

// Public exam routes (must be after specific routes)
router.get('/:idOrSlug', optionalAuth, examController.getExam);
router.get('/:examId/leaderboard', examController.getLeaderboard);

export default router;
