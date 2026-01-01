import mongoose from 'mongoose';

const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    exam: {
      type: Schema.Types.ObjectId,
      ref: 'Exam',
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'BDT',
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
      default: 'pending',
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ['bkash', 'nagad', 'rocket', 'card', 'bank_transfer', 'dummy'],
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    providerTransactionId: String, // Transaction ID from payment provider
    providerResponse: Schema.Types.Mixed, // Raw response from payment gateway
    paymentDetails: {
      senderNumber: String, // For mobile payments
      senderName: String,
      receiverNumber: String,
      reference: String,
    },
    metadata: {
      examTitle: String,
      originalPrice: Number,
      discountApplied: Number,
      discountCode: String,
      taxAmount: Number,
      processingFee: Number,
    },
    webhookReceived: {
      type: Boolean,
      default: false,
    },
    webhookData: Schema.Types.Mixed,
    webhookReceivedAt: Date,
    ipAddress: String,
    userAgent: String,
    refundDetails: {
      refundedAmount: Number,
      refundReason: String,
      refundedAt: Date,
      refundedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    notes: String,
    completedAt: Date,
    failedAt: Date,
    failureReason: String,
  },
  {
    timestamps: true,
  },
);

// Indexes
paymentSchema.index({ user: 1, status: 1, createdAt: -1 });
paymentSchema.index({ createdAt: -1 });
paymentSchema.index({ status: 1, paymentMethod: 1 });

// Generate unique transaction ID
paymentSchema.pre('save', function (next) {
  if (this.isNew && !this.transactionId) {
    this.transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
  next();
});

// Mark as completed
paymentSchema.methods.markAsCompleted = function (providerData = {}) {
  this.status = 'completed';
  this.completedAt = new Date();
  this.providerResponse = providerData;
  return this.save();
};

// Mark as failed
paymentSchema.methods.markAsFailed = function (reason) {
  this.status = 'failed';
  this.failedAt = new Date();
  this.failureReason = reason;
  return this.save();
};

// Process refund
paymentSchema.methods.processRefund = async function (amount, reason, refundedBy) {
  this.status = 'refunded';
  this.refundDetails = {
    refundedAmount: amount,
    refundReason: reason,
    refundedAt: new Date(),
    refundedBy,
  };
  return this.save();
};

// Static method to get user's purchase history
paymentSchema.statics.getUserPurchases = async function (userId, options = {}) {
  const {
    limit = 10, skip = 0, status = null,
  } = options;

  const query = { user: userId };
  if (status) query.status = status;

  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .populate('exam', 'title titleBn thumbnailUrl');
};

// Static method to check if user has purchased an exam
paymentSchema.statics.hasPurchased = async function (userId, examId) {
  const payment = await this.findOne({
    user: userId,
    exam: examId,
    status: 'completed',
  });

  return !!payment;
};

// Static method to get revenue stats
paymentSchema.statics.getRevenueStats = async function (startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        status: 'completed',
        completedAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$amount' },
        totalTransactions: { $sum: 1 },
        averageAmount: { $avg: '$amount' },
      },
    },
  ]);
};

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
