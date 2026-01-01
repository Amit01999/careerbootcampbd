import express from 'express';

// Import all route modules
import authRoutes from './authRoutes.js';
import examRoutes from './examRoutes.js';
import questionRoutes from './questionRoutes.js';
import circularRoutes from './circularRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import settingsRoutes from './settingsRoutes.js';

// Import admin route modules
import adminRoutes from './adminRoutes.js';
import adminExamRoutes from './adminExamRoutes.js';
import adminCircularRoutes from './adminCircularRoutes.js';
import adminPaymentRoutes from './adminPaymentRoutes.js';
import adminNotificationRoutes from './adminNotificationRoutes.js';
import adminSettingsRoutes from './adminSettingsRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

// ============ PUBLIC & STUDENT ROUTES ============

// Authentication
router.use('/auth', authRoutes);

// Exams (Student)
router.use('/exams', examRoutes);

// Job Circulars (Public/Student)
router.use('/circulars', circularRoutes);

// Payments (Student)
router.use('/payments', paymentRoutes);

// Notifications (Student)
router.use('/notifications', notificationRoutes);

// Settings (Public)
router.use('/settings', settingsRoutes);

// ============ ADMIN ROUTES ============

// Admin Dashboard & Analytics
router.use('/admin', adminRoutes);

// Admin Question Management
router.use('/admin/questions', questionRoutes);

// Admin Exam Management
router.use('/admin/exams', adminExamRoutes);

// Admin Circular Management
router.use('/admin/circulars', adminCircularRoutes);

// Admin Payment Management
router.use('/admin/payments', adminPaymentRoutes);

// Admin Notification Management
router.use('/admin/notifications', adminNotificationRoutes);

// Admin Settings Management
router.use('/admin/settings', adminSettingsRoutes);

// Admin User Management
router.use('/admin/users', userRoutes);

// ============ SYSTEM ROUTES ============

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// API info
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Private Bank Bootcamp API v1',
    version: '1.0.0',
    endpoints: {
      auth: '/api/v1/auth',
      exams: '/api/v1/exams',
      circulars: '/api/v1/circulars',
      payments: '/api/v1/payments',
      notifications: '/api/v1/notifications',
      settings: '/api/v1/settings',
      admin: '/api/v1/admin',
    },
    documentation: '/api/v1/docs',
  });
});

export default router;
