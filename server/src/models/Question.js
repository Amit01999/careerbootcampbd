import mongoose from 'mongoose';

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    questionText: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true,
    },
    questionTextBn: {
      type: String, // Bangla translation
      trim: true,
    },
    questionType: {
      type: String,
      enum: ['mcq', 'true_false', 'viva'],
      default: 'mcq',
      index: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      enum: ['math', 'english', 'general_knowledge', 'banking', 'ict', 'reasoning', 'bangla', 'viva'],
      index: true,
    },
    topic: {
      type: String,
      trim: true,
      index: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
      index: true,
    },
    options: [
      {
        text: {
          type: String,
          required: true,
        },
        textBn: String,
        isCorrect: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ],
    correctAnswer: {
      type: Number, // Index of correct option (0-based)
      required: true,
    },
    explanation: {
      type: String,
      trim: true,
    },
    explanationBn: {
      type: String,
      trim: true,
    },
    marks: {
      type: Number,
      default: 1,
      min: 0,
    },
    negativeMarks: {
      type: Number,
      default: 0,
      min: 0,
    },
    tags: [String],
    sourceFile: {
      type: Schema.Types.ObjectId,
      ref: 'QuestionFile',
    },
    sourcePageNumber: Number,
    sourceQuestionNumber: String,
    imageUrl: String, // For questions with images
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    verifiedAt: Date,
    usageCount: {
      type: Number,
      default: 0,
    },
    correctAttempts: {
      type: Number,
      default: 0,
    },
    incorrectAttempts: {
      type: Number,
      default: 0,
    },
    difficultyScore: {
      type: Number, // Calculated based on correct/incorrect ratio
      default: 0.5,
      min: 0,
      max: 1,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

// Compound indexes for efficient querying
questionSchema.index({ subject: 1, difficulty: 1, isActive: 1, isVerified: 1 });
questionSchema.index({ tags: 1, isActive: 1 });
questionSchema.index({ createdAt: -1 });
questionSchema.index({ usageCount: -1 });

// Validate options for MCQ
questionSchema.pre('save', function (next) {
  if (this.questionType === 'mcq' && this.options.length < 2) {
    next(new Error('MCQ questions must have at least 2 options'));
  }

  // Ensure only one correct answer
  const correctCount = this.options.filter((opt) => opt.isCorrect).length;
  if (correctCount !== 1) {
    next(new Error('There must be exactly one correct answer'));
  }

  // Set correctAnswer index
  this.correctAnswer = this.options.findIndex((opt) => opt.isCorrect);

  next();
});

// Update difficulty score based on attempts
questionSchema.methods.updateDifficultyScore = function () {
  const totalAttempts = this.correctAttempts + this.incorrectAttempts;
  if (totalAttempts > 0) {
    this.difficultyScore = this.correctAttempts / totalAttempts;
  }
};

// Static method to get random questions
questionSchema.statics.getRandomQuestions = async function (criteria, count) {
  const {
    subject, difficulty, tags, excludeIds = [],
  } = criteria;

  const query = {
    isActive: true,
    isVerified: true,
    _id: { $nin: excludeIds },
  };

  if (subject) query.subject = subject;
  if (difficulty) query.difficulty = difficulty;
  if (tags && tags.length > 0) query.tags = { $in: tags };

  return this.aggregate([
    { $match: query },
    { $sample: { size: count } },
  ]);
};

const Question = mongoose.model('Question', questionSchema);

export default Question;
