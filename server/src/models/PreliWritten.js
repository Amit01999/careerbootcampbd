import mongoose from 'mongoose';

const { Schema } = mongoose;

const preliWrittenSchema = new Schema(
  {
    headline: {
      type: String,
      required: [true, 'Headline is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const PreliWritten = mongoose.model('PreliWritten', preliWrittenSchema);

export default PreliWritten;
