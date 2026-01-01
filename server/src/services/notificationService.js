import admin, { firebaseApp } from '../config/firebase.js';
import { Notification } from '../models/index.js';
import logger from '../config/logger.js';

/**
 * Send push notification via Firebase
 */
export const sendPushNotification = async (fcmTokens, notification) => {
  if (!firebaseApp || !fcmTokens || fcmTokens.length === 0) {
    logger.warn('Firebase not initialized or no FCM tokens provided');
    return null;
  }

  try {
    const message = {
      notification: {
        title: notification.title,
        body: notification.message,
        ...(notification.imageUrl && { imageUrl: notification.imageUrl }),
      },
      data: {
        type: notification.type,
        ...(notification.relatedId && { relatedId: notification.relatedId.toString() }),
        ...(notification.actionUrl && { actionUrl: notification.actionUrl }),
        ...notification.data,
      },
      tokens: fcmTokens,
    };

    const response = await admin.messaging().sendMulticast(message);

    logger.info(`Push notifications sent: ${response.successCount} success, ${response.failureCount} failed`);

    return response;
  } catch (error) {
    logger.error('Error sending push notification:', error);
    throw error;
  }
};

/**
 * Send email notification
 */
export const sendEmailNotification = async (email, subject, htmlContent) => {
  // TODO: Implement email sending using nodemailer
  // This is a stub for now
  logger.info(`Email would be sent to ${email}: ${subject}`);

  return {
    success: true,
    message: 'Email sent (stub)',
  };
};

/**
 * Send SMS notification
 */
export const sendSMSNotification = async (phone, message) => {
  // TODO: Implement SMS sending
  // This is a stub for now
  logger.info(`SMS would be sent to ${phone}: ${message}`);

  return {
    success: true,
    message: 'SMS sent (stub)',
  };
};

/**
 * Create and send notification to user
 */
export const createNotification = async (notificationData) => {
  try {
    // Create in-app notification
    const notification = await Notification.createAndSend(notificationData);

    // Send push notification if enabled
    if (notificationData.channels?.push && notificationData.user) {
      const User = (await import('../models/index.js')).User;
      const user = await User.findById(notificationData.recipient);

      if (user && user.fcmTokens && user.fcmTokens.length > 0) {
        const fcmTokens = user.fcmTokens.map((t) => t.token);
        const pushResponse = await sendPushNotification(fcmTokens, notification);

        if (pushResponse) {
          notification.deliveryStatus.push.sent = true;
          notification.deliveryStatus.push.sentAt = new Date();
          notification.deliveryStatus.push.response = {
            successCount: pushResponse.successCount,
            failureCount: pushResponse.failureCount,
          };
          await notification.save();
        }
      }
    }

    // Send email if enabled
    if (notificationData.channels?.email && notificationData.userEmail) {
      // Queue email for background processing
      // This will be handled by the worker
    }

    return notification;
  } catch (error) {
    logger.error('Error creating notification:', error);
    throw error;
  }
};

/**
 * Send bulk notifications
 */
export const sendBulkNotifications = async (userIds, notificationTemplate) => {
  try {
    const notifications = await Notification.sendBulk(userIds, notificationTemplate);

    logger.info(`Bulk notifications created: ${notifications.length}`);

    return notifications;
  } catch (error) {
    logger.error('Error sending bulk notifications:', error);
    throw error;
  }
};

/**
 * Notify about new job circular
 */
export const notifyNewCircular = async (circular) => {
  try {
    // Get all active users who might be interested
    const User = (await import('../models/index.js')).User;
    const users = await User.find({ isActive: true, 'preferences.notifications.push': true })
      .select('_id')
      .limit(1000); // Limit for now

    const userIds = users.map((u) => u._id);

    const notificationTemplate = {
      type: 'new_circular',
      title: `New Job Opening: ${circular.bankName}`,
      titleBn: `নতুন চাকরির বিজ্ঞপ্তি: ${circular.bankNameBn || circular.bankName}`,
      message: `${circular.position} position at ${circular.bankName}. Deadline: ${new Date(circular.applicationDeadline).toLocaleDateString()}`,
      messageBn: `${circular.positionBn || circular.position} পদের জন্য আবেদন করুন। শেষ তারিখ: ${new Date(circular.applicationDeadline).toLocaleDateString('bn-BD')}`,
      relatedModel: 'Circular',
      relatedId: circular._id,
      actionUrl: `/circulars/${circular.slug}`,
      imageUrl: circular.imageUrl,
      priority: circular.priority === 'urgent' ? 'high' : 'medium',
    };

    await sendBulkNotifications(userIds, notificationTemplate);

    logger.info(`Notified ${userIds.length} users about new circular: ${circular.title}`);
  } catch (error) {
    logger.error('Error notifying about new circular:', error);
  }
};

/** * Send notification (alias for createNotification) */export const sendNotification = createNotification;
/** * Send bulk notification (alias for sendBulkNotifications) */export const sendBulkNotification = sendBulkNotifications;
export default {
  sendNotification,
  sendPushNotification,
  sendEmailNotification,
  sendSMSNotification,
  createNotification,
  sendBulkNotifications,
  notifyNewCircular,
};
