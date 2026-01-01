import express from 'express';
import * as notificationController from '../controllers/notificationController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin access
router.use(protect, restrictTo('admin', 'super_admin'));

// Notification management
router.post('/send', notificationController.sendNotificationAdmin);
router.post('/broadcast', notificationController.broadcastNotification);
router.get('/', notificationController.getAllNotifications);
router.get('/stats', notificationController.getNotificationStats);

export default router;
