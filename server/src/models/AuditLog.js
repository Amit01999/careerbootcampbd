import mongoose from 'mongoose';

const { Schema } = mongoose;

const auditLogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    action: {
      type: String,
      required: true,
      index: true,
    },
    resource: {
      type: String,
      required: true,
      index: true,
    },
    resourceId: Schema.Types.ObjectId,
    method: {
      type: String,
      enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    },
    endpoint: String,
    changes: {
      before: Schema.Types.Mixed,
      after: Schema.Types.Mixed,
    },
    status: {
      type: String,
      enum: ['success', 'failure', 'error'],
      default: 'success',
      index: true,
    },
    statusCode: Number,
    errorMessage: String,
    ipAddress: String,
    userAgent: String,
    metadata: Schema.Types.Mixed,
    duration: Number, // in milliseconds
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

// Indexes
auditLogSchema.index({ user: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });
auditLogSchema.index({ resource: 1, resourceId: 1 });
auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 }); // Auto-delete after 90 days

// Static method to log an action
auditLogSchema.statics.log = async function (logData) {
  try {
    await this.create(logData);
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // Don't throw error to prevent audit logging from breaking the main flow
  }
};

// Static method to get user activity
auditLogSchema.statics.getUserActivity = async function (userId, options = {}) {
  const {
    limit = 50, skip = 0, action = null, resource = null,
  } = options;

  const query = { user: userId };
  if (action) query.action = action;
  if (resource) query.resource = resource;

  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .select('-__v');
};

// Static method to get resource history
auditLogSchema.statics.getResourceHistory = async function (resource, resourceId, options = {}) {
  const { limit = 50, skip = 0 } = options;

  return this.find({ resource, resourceId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .populate('user', 'firstName lastName email')
    .select('-__v');
};

// Static method to get stats
auditLogSchema.statics.getStats = async function (startDate, endDate, groupBy = 'action') {
  return this.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: `$${groupBy}`,
        count: { $sum: 1 },
        successCount: {
          $sum: { $cond: [{ $eq: ['$status', 'success'] }, 1, 0] },
        },
        failureCount: {
          $sum: { $cond: [{ $eq: ['$status', 'failure'] }, 1, 0] },
        },
        avgDuration: { $avg: '$duration' },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);
};

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
