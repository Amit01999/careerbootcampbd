import { Notification } from '../models/index.js';
import { asyncHandler } from '../middleware/error.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { sendNotification, sendBulkNotification } from '../services/notificationService.js';

/**
 * @route   GET /api/v1/notifications
 * @desc    Get user's notifications
 * @access  Private
 */
export const getMyNotifications = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, type, isRead } = req.query;

  const query = { recipient: req.user.id };

  if (type) query.type = type;
  if (isRead !== undefined) query.isRead = isRead === 'true';

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [notifications, total] = await Promise.all([
    Notification.find(query)
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Notification.countDocuments(query),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, notifications, pagination, 'Notifications retrieved successfully');
});

/**
 * @route   GET /api/v1/notifications/unread-count
 * @desc    Get unread notification count
 * @access  Private
 */
export const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await Notification.getUnreadCount(req.user.id);

  successResponse(res, { count }, 'Unread count retrieved successfully');
});

/**
 * @route   PATCH /api/v1/notifications/:id/read
 * @desc    Mark notification as read
 * @access  Private
 */
export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOne({
    _id: req.params.id,
    recipient: req.user.id,
  });

  if (!notification) {
    return errorResponse(res, 'Notification not found', 404);
  }

  await notification.markAsRead();

  successResponse(res, notification, 'Notification marked as read');
});

/**
 * @route   PATCH /api/v1/notifications/read-all
 * @desc    Mark all notifications as read
 * @access  Private
 */
export const markAllAsRead = asyncHandler(async (req, res) => {
  const result = await Notification.markAllAsRead(req.user.id);

  successResponse(
    res,
    { modifiedCount: result.modifiedCount },
    'All notifications marked as read'
  );
});

/**
 * @route   DELETE /api/v1/notifications/:id
 * @desc    Delete a notification
 * @access  Private
 */
export const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findOne({
    _id: req.params.id,
    recipient: req.user.id,
  });

  if (!notification) {
    return errorResponse(res, 'Notification not found', 404);
  }

  await notification.deleteOne();

  successResponse(res, null, 'Notification deleted successfully');
});

// ============ ADMIN ROUTES ============

/**
 * @route   POST /api/v1/admin/notifications/send
 * @desc    Send notification to specific user
 * @access  Admin
 */
export const sendNotificationAdmin = asyncHandler(async (req, res) => {
  const {
    recipient,
    type,
    title,
    titleBn,
    message,
    messageBn,
    priority = 'medium',
    channels = { inApp: true, push: true },
    actionUrl,
    actionText,
    actionTextBn,
    imageUrl,
  } = req.body;

  const notification = await sendNotification({
    recipient,
    type,
    title,
    titleBn,
    message,
    messageBn,
    priority,
    ...channels,
    actionUrl,
    actionText,
    actionTextBn,
    imageUrl,
  });

  successResponse(res, notification, 'Notification sent successfully', 201);
});

/**
 * @route   POST /api/v1/admin/notifications/broadcast
 * @desc    Broadcast notification to all users or filtered users
 * @access  Admin
 */
export const broadcastNotification = asyncHandler(async (req, res) => {
  const {
    title,
    titleBn,
    message,
    messageBn,
    type = 'general',
    priority = 'medium',
    channels = { inApp: true, push: true },
    actionUrl,
    filter = {}, // Optional filter: { role: 'student', isActive: true }
  } = req.body;

  const result = await sendBulkNotification({
    filter,
    title,
    titleBn,
    message,
    messageBn,
    type,
    priority,
    ...channels,
    actionUrl,
  });

  successResponse(
    res,
    { sentCount: result.length },
    `Notification broadcast to ${result.length} users`
  );
});

/**
 * @route   GET /api/v1/admin/notifications
 * @desc    Get all notifications (admin view)
 * @access  Admin
 */
export const getAllNotifications = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 50,
    type,
    recipient,
    priority,
    startDate,
    endDate,
  } = req.query;

  const query = {};

  if (type) query.type = type;
  if (recipient) query.recipient = recipient;
  if (priority) query.priority = priority;

  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [notifications, total] = await Promise.all([
    Notification.find(query)
      .populate('recipient', 'firstName lastName email')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Notification.countDocuments(query),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, notifications, pagination, 'Notifications retrieved successfully');
});

/**
 * @route   GET /api/v1/admin/notifications/stats
 * @desc    Get notification statistics
 * @access  Admin
 */
export const getNotificationStats = asyncHandler(async (req, res) => {
  const stats = await Notification.aggregate([
    {
      $facet: {
        byType: [
          { $group: { _id: '$type', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ],
        byPriority: [
          { $group: { _id: '$priority', count: { $sum: 1 } } },
        ],
        overview: [
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              read: { $sum: { $cond: ['$isRead', 1, 0] } },
              unread: { $sum: { $cond: ['$isRead', 0, 1] } },
            },
          },
        ],
        deliveryStats: [
          {
            $group: {
              _id: null,
              inAppSent: { $sum: { $cond: ['$deliveryStatus.inApp.sent', 1, 0] } },
              pushSent: { $sum: { $cond: ['$deliveryStatus.push.sent', 1, 0] } },
              emailSent: { $sum: { $cond: ['$deliveryStatus.email.sent', 1, 0] } },
              smsSent: { $sum: { $cond: ['$deliveryStatus.sms.sent', 1, 0] } },
            },
          },
        ],
      },
    },
  ]);

  successResponse(res, stats[0], 'Notification statistics retrieved successfully');
});
