import { Payment, Exam, User } from '../models/index.js';
import { asyncHandler } from '../middleware/error.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { initiatePayment, verifyPayment } from '../services/paymentAdapter.js';
import { sendNotification } from '../services/notificationService.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * @route   POST /api/v1/payments/initiate
 * @desc    Initiate payment for exam purchase
 * @access  Private (Student)
 */
export const initiateExamPayment = asyncHandler(async (req, res) => {
  const { examId, paymentMethod = 'dummy' } = req.body;

  // Validate exam
  const exam = await Exam.findById(examId);

  if (!exam) {
    return errorResponse(res, 'Exam not found', 404);
  }

  if (!exam.isPublished || !exam.isActive) {
    return errorResponse(res, 'This exam is not available for purchase', 400);
  }

  if (exam.isFree) {
    return errorResponse(res, 'This exam is free. No payment required', 400);
  }

  // Check if already purchased
  const existingPayment = await Payment.findOne({
    user: req.user.id,
    exam: examId,
    status: 'completed',
  });

  if (existingPayment) {
    return errorResponse(res, 'You have already purchased this exam', 400);
  }

  // Create payment record
  const transactionId = `TXN-${Date.now()}-${uuidv4().substr(0, 8)}`;

  const payment = await Payment.create({
    user: req.user.id,
    exam: examId,
    amount: exam.discountedPrice || exam.price,
    currency: exam.currency || 'BDT',
    paymentMethod,
    transactionId,
    status: 'pending',
    examTitle: exam.title,
    originalPrice: exam.price,
    discountApplied: exam.price - (exam.discountedPrice || exam.price),
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
  });

  // Initiate payment with provider
  try {
    const paymentData = await initiatePayment({
      transactionId,
      amount: payment.amount,
      currency: payment.currency,
      method: paymentMethod,
      customerEmail: req.user.email,
      customerName: `${req.user.firstName} ${req.user.lastName}`,
      customerPhone: req.user.phone,
      returnUrl: `${process.env.FRONTEND_URL}/payments/${payment._id}/callback`,
    });

    payment.status = 'processing';
    payment.providerResponse = paymentData;
    await payment.save();

    successResponse(
      res,
      {
        paymentId: payment._id,
        transactionId: payment.transactionId,
        amount: payment.amount,
        currency: payment.currency,
        paymentUrl: paymentData.paymentUrl,
        providerData: paymentData,
      },
      'Payment initiated successfully',
      201
    );
  } catch (error) {
    payment.status = 'failed';
    payment.failureReason = error.message;
    payment.failedAt = new Date();
    await payment.save();

    return errorResponse(res, `Payment initiation failed: ${error.message}`, 500);
  }
});

/**
 * @route   POST /api/v1/payments/webhook/:provider
 * @desc    Handle payment webhook from provider (bKash, Nagad, Rocket)
 * @access  Public (Webhook)
 */
export const handlePaymentWebhook = asyncHandler(async (req, res) => {
  const { provider } = req.params;
  const webhookData = req.body;

  // Validate webhook signature (provider-specific)
  // TODO: Implement signature verification

  // Find payment by provider transaction ID
  const payment = await Payment.findOne({
    providerTransactionId: webhookData.transactionId,
  });

  if (!payment) {
    return errorResponse(res, 'Payment not found', 404);
  }

  payment.webhookReceived = true;
  payment.webhookData = webhookData;
  payment.webhookReceivedAt = new Date();

  // Update payment status based on webhook data
  if (webhookData.status === 'success' || webhookData.status === 'completed') {
    await payment.markAsCompleted({
      providerTransactionId: webhookData.transactionId,
      providerResponse: webhookData,
    });

    // Send success notification
    await sendNotification({
      recipient: payment.user,
      type: 'payment_success',
      title: 'Payment Successful',
      titleBn: 'পেমেন্ট সফল',
      message: `Your payment for ${payment.examTitle} was successful.`,
      messageBn: `${payment.examTitle} এর জন্য আপনার পেমেন্ট সফল হয়েছে।`,
      relatedModel: 'Payment',
      relatedId: payment._id,
      actionUrl: `/exams/${payment.exam}`,
      priority: 'high',
    });
  } else {
    await payment.markAsFailed(webhookData.failureReason || 'Payment failed');

    // Send failure notification
    await sendNotification({
      recipient: payment.user,
      type: 'payment_failed',
      title: 'Payment Failed',
      titleBn: 'পেমেন্ট ব্যর্থ',
      message: `Your payment for ${payment.examTitle} failed. Please try again.`,
      messageBn: `${payment.examTitle} এর জন্য আপনার পেমেন্ট ব্যর্থ হয়েছে। আবার চেষ্টা করুন।`,
      relatedModel: 'Payment',
      relatedId: payment._id,
      priority: 'medium',
    });
  }

  await payment.save();

  // Respond to webhook
  res.status(200).json({ success: true });
});

/**
 * @route   GET /api/v1/payments/:transactionId/status
 * @desc    Check payment status
 * @access  Private
 */
export const checkPaymentStatus = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;

  const payment = await Payment.findOne({ transactionId })
    .populate('exam', 'title titleBn slug')
    .lean();

  if (!payment) {
    return errorResponse(res, 'Payment not found', 404);
  }

  // Verify ownership
  if (payment.user.toString() !== req.user.id) {
    return errorResponse(res, 'Unauthorized access to payment', 403);
  }

  successResponse(res, payment, 'Payment status retrieved successfully');
});

/**
 * @route   GET /api/v1/payments/my-payments
 * @desc    Get user's payment history
 * @access  Private (Student)
 */
export const getMyPayments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;

  const query = { user: req.user.id };

  if (status) query.status = status;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [payments, total] = await Promise.all([
    Payment.find(query)
      .populate('exam', 'title titleBn slug')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .select('-providerResponse -webhookData')
      .lean(),
    Payment.countDocuments(query),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, payments, pagination, 'Payments retrieved successfully');
});

/**
 * @route   GET /api/v1/payments/check-purchase/:examId
 * @desc    Check if user has purchased an exam
 * @access  Private
 */
export const checkExamPurchase = asyncHandler(async (req, res) => {
  const { examId } = req.params;

  const hasPurchased = await Payment.hasPurchased(req.user.id, examId);

  successResponse(res, { hasPurchased }, 'Purchase status checked');
});

// ============ ADMIN ROUTES ============

/**
 * @route   GET /api/v1/admin/payments
 * @desc    Get all payments (admin)
 * @access  Admin
 */
export const getAllPayments = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    status,
    paymentMethod,
    startDate,
    endDate,
    search,
    sortBy = '-createdAt',
  } = req.query;

  const query = {};

  if (status) query.status = status;
  if (paymentMethod) query.paymentMethod = paymentMethod;

  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }

  if (search) {
    query.$or = [
      { transactionId: { $regex: search, $options: 'i' } },
      { providerTransactionId: { $regex: search, $options: 'i' } },
      { senderNumber: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [payments, total] = await Promise.all([
    Payment.find(query)
      .populate('user', 'firstName lastName email phone')
      .populate('exam', 'title titleBn')
      .sort(sortBy)
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Payment.countDocuments(query),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, payments, pagination, 'Payments retrieved successfully');
});

/**
 * @route   POST /api/v1/admin/payments/:id/verify
 * @desc    Manually verify payment (admin)
 * @access  Admin
 */
export const verifyPaymentManually = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (!payment) {
    return errorResponse(res, 'Payment not found', 404);
  }

  if (payment.status === 'completed') {
    return errorResponse(res, 'Payment already completed', 400);
  }

  await payment.markAsCompleted({
    providerTransactionId: `MANUAL-${Date.now()}`,
    providerResponse: { manuallyVerified: true, verifiedBy: req.user.id },
  });

  await payment.save();

  // Send notification
  await sendNotification({
    recipient: payment.user,
    type: 'payment_success',
    title: 'Payment Verified',
    titleBn: 'পেমেন্ট যাচাই করা হয়েছে',
    message: `Your payment for ${payment.examTitle} has been verified.`,
    messageBn: `${payment.examTitle} এর জন্য আপনার পেমেন্ট যাচাই করা হয়েছে।`,
    relatedModel: 'Payment',
    relatedId: payment._id,
    priority: 'high',
  });

  successResponse(res, payment, 'Payment verified successfully');
});

/**
 * @route   POST /api/v1/admin/payments/:id/refund
 * @desc    Process payment refund
 * @access  Admin
 */
export const processRefund = asyncHandler(async (req, res) => {
  const { reason, amount } = req.body;

  const payment = await Payment.findById(req.params.id);

  if (!payment) {
    return errorResponse(res, 'Payment not found', 404);
  }

  if (payment.status !== 'completed') {
    return errorResponse(res, 'Only completed payments can be refunded', 400);
  }

  const refundAmount = amount || payment.amount;

  await payment.processRefund(refundAmount, reason, req.user.id);
  await payment.save();

  // Send notification
  await sendNotification({
    recipient: payment.user,
    type: 'payment_refund',
    title: 'Payment Refunded',
    titleBn: 'পেমেন্ট ফেরত',
    message: `Your payment of ${refundAmount} ${payment.currency} has been refunded.`,
    messageBn: `আপনার ${refundAmount} ${payment.currency} পেমেন্ট ফেরত দেওয়া হয়েছে।`,
    relatedModel: 'Payment',
    relatedId: payment._id,
    priority: 'high',
  });

  successResponse(res, payment, 'Refund processed successfully');
});

/**
 * @route   GET /api/v1/admin/payments/stats
 * @desc    Get payment statistics
 * @access  Admin
 */
export const getPaymentStats = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const matchQuery = {};
  if (startDate || endDate) {
    matchQuery.createdAt = {};
    if (startDate) matchQuery.createdAt.$gte = new Date(startDate);
    if (endDate) matchQuery.createdAt.$lte = new Date(endDate);
  }

  const stats = await Payment.aggregate([
    { $match: matchQuery },
    {
      $facet: {
        overview: [
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: { $cond: [{ $eq: ['$status', 'completed'] }, '$amount', 0] },
              },
              totalTransactions: { $sum: 1 },
              completedTransactions: {
                $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] },
              },
              failedTransactions: {
                $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] },
              },
              pendingTransactions: {
                $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] },
              },
              refundedAmount: { $sum: { $ifNull: ['$refundedAmount', 0] } },
            },
          },
        ],
        byMethod: [
          {
            $group: {
              _id: '$paymentMethod',
              count: { $sum: 1 },
              revenue: {
                $sum: { $cond: [{ $eq: ['$status', 'completed'] }, '$amount', 0] },
              },
            },
          },
        ],
        byStatus: [
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
            },
          },
        ],
        dailyRevenue: [
          {
            $match: { status: 'completed' },
          },
          {
            $group: {
              _id: { $dateToString: { format: '%Y-%m-%d', date: '$completedAt' } },
              revenue: { $sum: '$amount' },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
          { $limit: 30 },
        ],
      },
    },
  ]);

  successResponse(res, stats[0], 'Payment statistics retrieved successfully');
});
