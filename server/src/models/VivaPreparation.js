import mongoose from 'mongoose';

const { Schema } = mongoose;

const vivaPreparationSchema = new Schema(
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

const VivaPreparation = mongoose.model('VivaPreparation', vivaPreparationSchema);

export default VivaPreparation;
