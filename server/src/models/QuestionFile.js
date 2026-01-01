import mongoose from 'mongoose';

const { Schema } = mongoose;

const questionFileSchema = new Schema(
  {
    originalName: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ['pdf', 'excel', 'csv'],
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    s3Key: {
      type: String,
      required: true,
    },
    s3Url: String,
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    processingStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'review'],
      default: 'pending',
      index: true,
    },
    processingError: String,
    parsedData: {
      totalPages: Number,
      totalQuestions: Number,
      extractedText: String,
      rawParsedQuestions: [{
        pageNumber: Number,
        questionNumber: String,
        questionText: String,
        options: [String],
        detectedAnswer: String,
        confidence: Number,
      }],
    },
    reviewNotes: String,
    approvedQuestionsCount: {
      type: Number,
      default: 0,
    },
    rejectedQuestionsCount: {
      type: Number,
      default: 0,
    },
    pendingReviewCount: {
      type: Number,
      default: 0,
    },
    processingStartedAt: Date,
    processingCompletedAt: Date,
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewedAt: Date,
    metadata: {
      subject: String,
      examName: String,
      examYear: Number,
      sourceOrganization: String,
      tags: [String],
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
questionFileSchema.index({ uploadedBy: 1, createdAt: -1 });
questionFileSchema.index({ processingStatus: 1 });

// Update counts
questionFileSchema.methods.updateCounts = async function () {
  const Question = mongoose.model('Question');

  const approved = await Question.countDocuments({
    sourceFile: this._id,
    isVerified: true,
    isActive: true,
  });

  const pending = await Question.countDocuments({
    sourceFile: this._id,
    isVerified: false,
    isActive: true,
  });

  const rejected = await Question.countDocuments({
    sourceFile: this._id,
    isActive: false,
  });

  this.approvedQuestionsCount = approved;
  this.pendingReviewCount = pending;
  this.rejectedQuestionsCount = rejected;

  await this.save();
};

const QuestionFile = mongoose.model('QuestionFile', questionFileSchema);

export default QuestionFile;
