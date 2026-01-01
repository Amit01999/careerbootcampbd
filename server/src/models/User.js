import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
      index: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
      match: [/^(\+8801|01)[3-9]\d{8}$/, 'Please enter a valid Bangladeshi phone number'],
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'super_admin'],
      default: 'student',
      index: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: null,
    },
    profile: {
      dateOfBirth: Date,
      gender: {
        type: String,
        enum: ['male', 'female', 'other'],
      },
      address: {
        division: String,
        district: String,
        upazila: String,
        fullAddress: String,
      },
      education: {
        degree: String,
        institution: String,
        passingYear: Number,
        major: String,
      },
      targetBanks: [String], // Banks user is preparing for
      preferredSubjects: [String], // Subjects user wants to focus on
    },
    fcmTokens: [{
      token: String,
      device: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    preferences: {
      language: {
        type: String,
        enum: ['en', 'bn'],
        default: 'en',
      },
      notifications: {
        email: {
          type: Boolean,
          default: true,
        },
        push: {
          type: Boolean,
          default: true,
        },
        sms: {
          type: Boolean,
          default: false,
        },
      },
    },
    stats: {
      totalExamsTaken: {
        type: Number,
        default: 0,
      },
      totalQuestionsAnswered: {
        type: Number,
        default: 0,
      },
      totalCorrectAnswers: {
        type: Number,
        default: 0,
      },
      averageScore: {
        type: Number,
        default: 0,
      },
      bestScore: {
        type: Number,
        default: 0,
      },
      totalStudyTime: {
        type: Number,
        default: 0, // in minutes
      },
    },
    lastLogin: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    phoneOTP: String,
    phoneOTPExpires: Date,
    refreshTokens: [{
      token: String,
      createdAt: Date,
      expiresAt: Date,
      device: String,
      ipAddress: String,
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes for performance
userSchema.index({ createdAt: -1 });
userSchema.index({ 'stats.averageScore': -1 });
userSchema.index({ 'stats.totalExamsTaken': -1 });

// Virtual for full name
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS || '12', 10));
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update passwordChangedAt when password is modified
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Instance method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Instance method to check if password was changed after token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Static method to update user stats
userSchema.statics.updateStats = async function (userId, examResult) {
  const user = await this.findById(userId);
  if (!user) return;

  user.stats.totalExamsTaken += 1;
  user.stats.totalQuestionsAnswered += examResult.totalQuestions;
  user.stats.totalCorrectAnswers += examResult.correctAnswers;

  const totalScore = user.stats.averageScore * (user.stats.totalExamsTaken - 1) + examResult.scorePercentage;
  user.stats.averageScore = totalScore / user.stats.totalExamsTaken;

  if (examResult.scorePercentage > user.stats.bestScore) {
    user.stats.bestScore = examResult.scorePercentage;
  }

  await user.save();
};

const User = mongoose.model('User', userSchema);

export default User;
