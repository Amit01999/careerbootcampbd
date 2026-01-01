import express from 'express';
import * as paymentController from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Student routes
router.post('/initiate', protect, paymentController.initiateExamPayment);
router.get('/:transactionId/status', protect, paymentController.checkPaymentStatus);
router.get('/my-payments', protect, paymentController.getMyPayments);
router.get('/check-purchase/:examId', protect, paymentController.checkExamPurchase);

// Webhook routes (public - no auth, validated by signature)
router.post('/webhook/bkash', paymentController.handlePaymentWebhook);
router.post('/webhook/nagad', paymentController.handlePaymentWebhook);
router.post('/webhook/rocket', paymentController.handlePaymentWebhook);
router.post('/webhook/dummy', paymentController.handlePaymentWebhook);

export default router;
