import express from 'express';
import * as examManagementController from '../controllers/examManagementController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin access
router.use(protect, restrictTo('admin', 'super_admin'));

// Exam management
router.post('/', examManagementController.createExam);
router.get('/', examManagementController.getAllExamsAdmin);
router.get('/:id', examManagementController.getExamByIdAdmin);
router.put('/:id', examManagementController.updateExam);
router.delete('/:id', examManagementController.deleteExam);

// Publish/Unpublish
router.patch('/:id/publish', examManagementController.publishExam);
router.patch('/:id/unpublish', examManagementController.unpublishExam);

// Statistics
router.get('/:id/statistics', examManagementController.getExamStatistics);

// Utility
router.post('/:id/duplicate', examManagementController.duplicateExam);
router.get('/:id/validate-sections', examManagementController.validateExamSections);

export default router;
