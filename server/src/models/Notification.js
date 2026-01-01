import mongoose from 'mongoose';

const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        'exam_result',
        'exam_reminder',
        'new_exam',
        'new_circular',
        'payment_success',
        'payment_failed',
        'circular_deadline',
        'system',
        'achievement',
        'general',
      ],
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    titleBn: String,
    message: {
      type: String,
      required: true,
    },
    messageBn: String,
    data: Schema.Types.Mixed, // Additional data for the notification
    relatedModel: {
      type: String,
      enum: ['Exam', 'ExamAttempt', 'Circular', 'Payment', null],
    },
    relatedId: Schema.Types.ObjectId,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    channels: {
      inApp: {
        type: Boolean,
        default: true,
      },
      push: {
        type: Boolean,
        default: false,
      },
      email: {
        type: Boolean,
        default: false,
      },
      sms: {
        type: Boolean,
        default: false,
      },
    },
    deliveryStatus: {
      inApp: {
        sent: { type: Boolean, default: false },
        sentAt: Date,
      },
      push: {
        sent: { type: Boolean, default: false },
        sentAt: Date,
        response: Schema.Types.Mixed,
      },
      email: {
        sent: { type: Boolean, default: false },
        sentAt: Date,
        response: Schema.Types.Mixed,
      },
      sms: {
        sent: { type: Boolean, default: false },
        sentAt: Date,
        response: Schema.Types.Mixed,
      },
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
    readAt: Date,
    actionUrl: String, // URL to navigate when notification is clicked
    actionText: String,
    actionTextBn: String,
    imageUrl: String,
    iconUrl: String,
    expiresAt: Date,
    metadata: {
      campaign: String,
      batch: String,
      template: String,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, type: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Auto-delete expired notifications

// Mark as read
notificationSchema.methods.markAsRead = async function () {
  this.isRead = true;
  this.readAt = new Date();
  return this.save();
};

// Static method to get user notifications
notificationSchema.statics.getUserNotifications = async function (userId, options = {}) {
  const {
    unreadOnly = false, type = null, limit = 20, skip = 0,
  } = options;

  const query = { recipient: userId };
  if (unreadOnly) query.isRead = false;
  if (type) query.type = type;

  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .select('-__v');
};

// Static method to get unread count
notificationSchema.statics.getUnreadCount = async function (userId) {
  return this.countDocuments({ recipient: userId, isRead: false });
};

// Static method to mark all as read
notificationSchema.statics.markAllAsRead = async function (userId) {
  return this.updateMany(
    { recipient: userId, isRead: false },
    { $set: { isRead: true, readAt: new Date() } },
  );
};

// Static method to create and send notification
notificationSchema.statics.createAndSend = async function (notificationData) {
  const notification = await this.create(notificationData);

  // Mark in-app as sent immediately
  notification.deliveryStatus.inApp.sent = true;
  notification.deliveryStatus.inApp.sentAt = new Date();
  await notification.save();

  // Queue other delivery channels (push, email, sms) for background processing
  // This will be handled by the notification worker

  return notification;
};

// Static method to send bulk notifications
notificationSchema.statics.sendBulk = async function (recipients, notificationTemplate) {
  const notifications = recipients.map((recipientId) => ({
    ...notificationTemplate,
    recipient: recipientId,
  }));

  return this.insertMany(notifications);
};

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
