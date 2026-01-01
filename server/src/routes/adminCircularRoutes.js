import express from 'express';
import * as circularController from '../controllers/circularController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin access
router.use(protect, restrictTo('admin', 'super_admin'));

// Circular management
router.post('/', circularController.createCircular);
router.get('/', circularController.getAllCircularsAdmin);
router.get('/:id', circularController.getCircularByIdAdmin);
router.put('/:id', circularController.updateCircular);
router.delete('/:id', circularController.deleteCircular);

// Publish/Unpublish
router.patch('/:id/publish', circularController.publishCircular);
router.patch('/:id/unpublish', circularController.unpublishCircular);

// Analytics
router.get('/:id/analytics', circularController.getCircularAnalytics);

export default router;
