import mongoose from 'mongoose';

const { Schema } = mongoose;

const answerSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  selectedOption: Number, // Index of selected option
  isCorrect: Boolean,
  marksObtained: Number,
  timeTaken: Number, // seconds spent on this question
  isMarkedForReview: {
    type: Boolean,
    default: false,
  },
  answeredAt: Date,
}, { _id: false });

const examAttemptSchema = new Schema(
  {
    exam: {
      type: Schema.Types.ObjectId,
      ref: 'Exam',
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    attemptNumber: {
      type: Number,
      required: true,
      default: 1,
    },
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'submitted', 'auto_submitted', 'abandoned'],
      default: 'not_started',
      index: true,
    },
    questions: [{
      type: Schema.Types.ObjectId,
      ref: 'Question',
    }],
    answers: [answerSchema],
    startedAt: Date,
    submittedAt: Date,
    timeAllowed: {
      type: Number, // in minutes
      required: true,
    },
    timeTaken: Number, // in minutes
    expiresAt: {
      type: Date,
      index: true,
    },
    score: {
      totalQuestions: Number,
      attemptedQuestions: Number,
      correctAnswers: Number,
      incorrectAnswers: Number,
      skippedQuestions: Number,
      marksObtained: Number,
      totalMarks: Number,
      scorePercentage: Number,
      isPassed: Boolean,
    },
    sectionScores: [{
      sectionName: String,
      subject: String,
      totalQuestions: Number,
      correctAnswers: Number,
      marksObtained: Number,
      totalMarks: Number,
      percentage: Number,
    }],
    subjectWiseAnalysis: [{
      subject: String,
      totalQuestions: Number,
      correctAnswers: Number,
      incorrectAnswers: Number,
      accuracy: Number,
    }],
    difficultyAnalysis: [{
      difficulty: String,
      totalQuestions: Number,
      correctAnswers: Number,
      accuracy: Number,
    }],
    rank: Number, // Rank among all attempts for this exam
    percentile: Number,
    reportPdfUrl: String,
    tabSwitchCount: {
      type: Number,
      default: 0,
    },
    warnings: [{
      type: String,
      timestamp: Date,
    }],
    deviceInfo: {
      userAgent: String,
      ipAddress: String,
      browser: String,
      os: String,
    },
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
      submittedAt: Date,
    },
  },
  {
    timestamps: true,
  },
);

// Compound indexes
examAttemptSchema.index({ exam: 1, user: 1, createdAt: -1 });
examAttemptSchema.index({ user: 1, status: 1 });
examAttemptSchema.index({ 'score.scorePercentage': -1 });
examAttemptSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 }); // Auto-cleanup after 7 days

// Note: Questions are populated explicitly where needed in controllers/services

// Calculate score
examAttemptSchema.methods.calculateScore = function () {
  const { answers, questions } = this;

  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let skippedQuestions = 0;
  let marksObtained = 0;

  answers.forEach((answer) => {
    if (answer.selectedOption === null || answer.selectedOption === undefined) {
      skippedQuestions += 1;
    } else if (answer.isCorrect) {
      correctAnswers += 1;
      marksObtained += answer.marksObtained;
    } else {
      incorrectAnswers += 1;
      marksObtained += answer.marksObtained; // This can be negative for wrong answers
    }
  });

  const totalQuestions = questions.length;
  const attemptedQuestions = totalQuestions - skippedQuestions;

  // Calculate total marks (from exam config)
  const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 1), 0);

  const scorePercentage = totalMarks > 0 ? (marksObtained / totalMarks) * 100 : 0;

  this.score = {
    totalQuestions,
    attemptedQuestions,
    correctAnswers,
    incorrectAnswers,
    skippedQuestions,
    marksObtained: Math.max(0, marksObtained), // Prevent negative total score
    totalMarks,
    scorePercentage: Math.max(0, scorePercentage),
    isPassed: false, // Will be set based on exam passing marks
  };

  return this.score;
};

// Calculate subject-wise analysis
examAttemptSchema.methods.calculateSubjectAnalysis = function () {
  const subjectMap = new Map();

  this.answers.forEach((answer, index) => {
    const question = this.questions[index];
    if (!question) return;

    const { subject } = question;

    if (!subjectMap.has(subject)) {
      subjectMap.set(subject, {
        subject,
        totalQuestions: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        accuracy: 0,
      });
    }

    const subjectData = subjectMap.get(subject);
    subjectData.totalQuestions += 1;

    if (answer.isCorrect) {
      subjectData.correctAnswers += 1;
    } else if (answer.selectedOption !== null && answer.selectedOption !== undefined) {
      subjectData.incorrectAnswers += 1;
    }
  });

  this.subjectWiseAnalysis = Array.from(subjectMap.values()).map((data) => ({
    ...data,
    accuracy: data.totalQuestions > 0
      ? (data.correctAnswers / data.totalQuestions) * 100
      : 0,
  }));
};

// Static method to get user's attempt history
examAttemptSchema.statics.getUserHistory = async function (userId, options = {}) {
  const {
    limit = 10, skip = 0, examId = null, status = 'submitted',
  } = options;

  const query = { user: userId, status };
  if (examId) query.exam = examId;

  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .populate('exam', 'title titleBn duration totalMarks')
    .select('-questions -answers');
};

// Static method to get leaderboard
examAttemptSchema.statics.getLeaderboard = async function (examId, options = {}) {
  const { limit = 10 } = options;

  return this.find({ exam: examId, status: 'submitted' })
    .sort({ 'score.scorePercentage': -1, timeTaken: 1 })
    .limit(limit)
    .populate('user', 'firstName lastName avatar')
    .select('user score timeTaken submittedAt');
};

const ExamAttempt = mongoose.model('ExamAttempt', examAttemptSchema);

export default ExamAttempt;
