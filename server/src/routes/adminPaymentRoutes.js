import express from 'express';
import * as paymentController from '../controllers/paymentController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin access
router.use(protect, restrictTo('admin', 'super_admin'));

// Payment management
router.get('/', paymentController.getAllPayments);
router.get('/stats', paymentController.getPaymentStats);
router.post('/:id/verify', paymentController.verifyPaymentManually);
router.post('/:id/refund', paymentController.processRefund);

export default router;
