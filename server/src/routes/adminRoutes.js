import express from 'express';
import * as adminController from '../controllers/adminController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin access
router.use(protect, restrictTo('admin', 'super_admin'));

// Dashboard & Analytics
router.get('/dashboard/stats', adminController.getDashboardStats);
router.get('/dashboard/revenue', adminController.getRevenueAnalytics);
router.get('/dashboard/users', adminController.getUserAnalytics);
router.get('/dashboard/exams', adminController.getExamAnalytics);

// Export
router.get('/analytics/export', adminController.exportAnalytics);

export default router;
