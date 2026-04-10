import mongoose from 'mongoose';

const bankRecruitmentSchema = new mongoose.Schema(
  {
    bankLogoUrl: {
      type: String,
      required: [true, 'Bank logo URL is required'],
      trim: true,
    },
    bankLogoPublicId: {
      type: String,
      required: [true, 'Bank logo publicId is required'],
      trim: true,
    },
    bankName: {
      type: String,
      required: [true, 'Bank name is required'],
      trim: true,
      minlength: [2, 'Bank name must be at least 2 characters'],
      maxlength: [120, 'Bank name must be at most 120 characters'],
    },
    positionTitle: {
      type: String,
      required: [true, 'Position / Job title is required'],
      trim: true,
      minlength: [2, 'Position title must be at least 2 characters'],
      maxlength: [160, 'Position title must be at most 160 characters'],
    },
    details: {
      type: String,
      required: [true, 'Recruitment details are required'],
      trim: true,
      minlength: [10, 'Recruitment details must be at least 10 characters'],
      maxlength: [20000, 'Recruitment details must be at most 20000 characters'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const BankRecruitment = mongoose.model('BankRecruitment', bankRecruitmentSchema);

export default BankRecruitment;

