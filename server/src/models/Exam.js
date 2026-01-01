import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema } = mongoose;

const examSectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nameBn: String,
  subject: {
    type: String,
    required: true,
  },
  questionsCount: {
    type: Number,
    required: true,
    min: 1,
  },
  marksPerQuestion: {
    type: Number,
    default: 1,
    min: 0,
  },
  negativeMarking: {
    enabled: {
      type: Boolean,
      default: false,
    },
    marksPerWrong: {
      type: Number,
      default: 0.25,
    },
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'mixed'],
    default: 'mixed',
  },
  tags: [String],
});

const examSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Exam title is required'],
      trim: true,
    },
    titleBn: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    descriptionBn: {
      type: String,
      trim: true,
    },
    examType: {
      type: String,
      enum: ['practice', 'mock', 'previous_year', 'custom'],
      default: 'practice',
      index: true,
    },
    category: {
      type: String,
      enum: ['general', 'bank_specific', 'subject_specific', 'viva'],
      default: 'general',
      index: true,
    },
    targetBank: String, // Specific bank name if applicable
    sections: [examSectionSchema],
    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
    },
    totalMarks: {
      type: Number,
      required: true,
      min: 0,
    },
    passingMarks: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: Number, // in minutes
      required: true,
      min: 1,
    },
    instructions: {
      type: String,
    },
    instructionsBn: {
      type: String,
    },
    pricing: {
      isFree: {
        type: Boolean,
        default: false,
      },
      price: {
        type: Number,
        default: 0,
        min: 0,
      },
      currency: {
        type: String,
        default: 'BDT',
      },
      discountedPrice: {
        type: Number,
        min: 0,
      },
    },
    availability: {
      isPublished: {
        type: Boolean,
        default: false,
        index: true,
      },
      publishedAt: Date,
      startDate: Date,
      endDate: Date,
      maxAttempts: {
        type: Number,
        default: 0, // 0 means unlimited
      },
    },
    settings: {
      showResultImmediately: {
        type: Boolean,
        default: true,
      },
      showCorrectAnswers: {
        type: Boolean,
        default: true,
      },
      showExplanations: {
        type: Boolean,
        default: true,
      },
      shuffleQuestions: {
        type: Boolean,
        default: true,
      },
      shuffleOptions: {
        type: Boolean,
        default: true,
      },
      allowReview: {
        type: Boolean,
        default: true,
      },
      allowSkip: {
        type: Boolean,
        default: true,
      },
      autoSubmit: {
        type: Boolean,
        default: true,
      },
      preventTabSwitch: {
        type: Boolean,
        default: false,
      },
    },
    stats: {
      totalAttempts: {
        type: Number,
        default: 0,
      },
      totalStudents: {
        type: Number,
        default: 0,
      },
      averageScore: {
        type: Number,
        default: 0,
      },
      highestScore: {
        type: Number,
        default: 0,
      },
      lowestScore: {
        type: Number,
        default: 100,
      },
      averageTime: {
        type: Number,
        default: 0, // in minutes
      },
    },
    thumbnailUrl: String,
    tags: [String],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes
examSchema.index({ 'availability.isPublished': 1, isActive: 1, createdAt: -1 });
examSchema.index({ 'pricing.isFree': 1 });
examSchema.index({ tags: 1 });
examSchema.index({ examType: 1, category: 1 });

// Generate slug before saving
examSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // Calculate total questions and marks
  if (this.sections && this.sections.length > 0) {
    this.totalQuestions = this.sections.reduce((sum, section) => sum + section.questionsCount, 0);
    this.totalMarks = this.sections.reduce((sum, section) => sum + (section.questionsCount * section.marksPerQuestion), 0);
  }

  next();
});

// Virtual for attempt count
examSchema.virtual('attemptCount', {
  ref: 'ExamAttempt',
  localField: '_id',
  foreignField: 'exam',
  count: true,
});

// Static method to update exam stats
examSchema.statics.updateStats = async function (examId, attemptResult) {
  const exam = await this.findById(examId);
  if (!exam) return;

  exam.stats.totalAttempts += 1;

  // Update average score
  const totalScore = exam.stats.averageScore * (exam.stats.totalAttempts - 1) + attemptResult.scorePercentage;
  exam.stats.averageScore = totalScore / exam.stats.totalAttempts;

  // Update highest/lowest scores
  if (attemptResult.scorePercentage > exam.stats.highestScore) {
    exam.stats.highestScore = attemptResult.scorePercentage;
  }
  if (attemptResult.scorePercentage < exam.stats.lowestScore) {
    exam.stats.lowestScore = attemptResult.scorePercentage;
  }

  // Update average time
  const totalTime = exam.stats.averageTime * (exam.stats.totalAttempts - 1) + attemptResult.timeTaken;
  exam.stats.averageTime = totalTime / exam.stats.totalAttempts;

  await exam.save();
};

const Exam = mongoose.model('Exam', examSchema);

export default Exam;
