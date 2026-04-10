import mongoose from 'mongoose';

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    question: { type: String, required: true },
    options: {
      A: { type: String, required: true },
      B: { type: String, required: true },
      C: { type: String, required: true },
      D: { type: String, required: true },
    },
    correctAnswer: { type: String, enum: ['A', 'B', 'C', 'D'], required: true },
  },
  { _id: true }
);

const modelTestSchema = new Schema(
  {
    modelTestNo: { type: String, required: [true, 'Model Test No is required'], trim: true },
    post:        { type: String, required: [true, 'Post is required'], trim: true },
    time:        { type: String, trim: true },
    mark:        { type: Number },
    totalQuestions: { type: Number },
    content:     { type: String, required: [true, 'Content is required'] },
    questions:   [questionSchema],
    isActive:    { type: Boolean, default: true, index: true },
    createdBy:   { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const ModelTest = mongoose.model('ModelTest', modelTestSchema);
export default ModelTest;
