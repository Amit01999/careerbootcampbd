import { sendPushNotification, sendEmailNotification, sendSMSNotification } from '../../services/notificationService.js';
import { Notification, User } from '../../models/index.js';
import logger from '../../config/logger.js';

export const processNotificationJob = async (job) => {
  const { notificationId, channels } = job.data;

  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      throw new Error('Notification not found');
    }

    const user = await User.findById(notification.recipient);

    if (!user) {
      throw new Error('User not found');
    }

    const results = {
      push: null,
      email: null,
      sms: null,
    };

    // Send push notification
    if (channels.push && user.fcmTokens && user.fcmTokens.length > 0) {
      const fcmTokens = user.fcmTokens.map((t) => t.token);
      results.push = await sendPushNotification(fcmTokens, notification);

      notification.deliveryStatus.push.sent = true;
      notification.deliveryStatus.push.sentAt = new Date();
      notification.deliveryStatus.push.response = results.push;
    }

    // Send email
    if (channels.email && user.email && user.preferences.notifications.email) {
      results.email = await sendEmailNotification(
        user.email,
        notification.title,
        notification.message,
      );

      notification.deliveryStatus.email.sent = true;
      notification.deliveryStatus.email.sentAt = new Date();
    }

    // Send SMS
    if (channels.sms && user.phone && user.preferences.notifications.sms) {
      results.sms = await sendSMSNotification(
        user.phone,
        notification.message,
      );

      notification.deliveryStatus.sms.sent = true;
      notification.deliveryStatus.sms.sentAt = new Date();
    }

    await notification.save();

    logger.info(`Notification processed: ${notificationId}`);

    return {
      success: true,
      results,
    };
  } catch (error) {
    logger.error(`Error processing notification ${notificationId}:`, error);
    throw error;
  }
};

export default processNotificationJob;
