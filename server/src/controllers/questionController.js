import { Question, QuestionFile } from '../models/index.js';
import { asyncHandler } from '../middleware/error.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { uploadToS3, getSignedFileUrl } from '../services/s3Service.js';
import { parseQuestionFile } from '../services/questionParser.js';
import { addJobToQueue } from '../workers/index.js';

/**
 * @route   POST /api/v1/admin/questions
 * @desc    Create a single question manually
 * @access  Admin
 */
export const createQuestion = asyncHandler(async (req, res) => {
  const questionData = {
    ...req.body,
    createdBy: req.user.id,
    isVerified: true, // Admin-created questions are auto-verified
    verifiedBy: req.user.id,
    verifiedAt: new Date(),
  };

  const question = await Question.create(questionData);

  successResponse(res, question, 'Question created successfully', 201);
});

/**
 * @route   GET /api/v1/admin/questions
 * @desc    Get all questions with filters and pagination
 * @access  Admin
 */
export const getQuestions = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    subject,
    difficulty,
    questionType,
    isActive,
    isVerified,
    search,
    sortBy = '-createdAt',
  } = req.query;

  const query = {};

  // Build filter query
  if (subject) query.subject = subject;
  if (difficulty) query.difficulty = difficulty;
  if (questionType) query.questionType = questionType;
  if (isActive !== undefined) query.isActive = isActive === 'true';
  if (isVerified !== undefined) query.isVerified = isVerified === 'true';

  // Search in question text
  if (search) {
    query.$or = [
      { questionText: { $regex: search, $options: 'i' } },
      { questionTextBn: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [questions, total] = await Promise.all([
    Question.find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Question.countDocuments(query),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, questions, pagination, 'Questions retrieved successfully');
});

/**
 * @route   GET /api/v1/admin/questions/:id
 * @desc    Get single question details
 * @access  Admin
 */
export const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    return errorResponse(res, 'Question not found', 404);
  }

  successResponse(res, question, 'Question retrieved successfully');
});

/**
 * @route   PUT /api/v1/admin/questions/:id
 * @desc    Update a question
 * @access  Admin
 */
export const updateQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    return errorResponse(res, 'Question not found', 404);
  }

  // Update fields
  Object.assign(question, req.body);
  question.updatedAt = new Date();

  await question.save();

  successResponse(res, question, 'Question updated successfully');
});

/**
 * @route   DELETE /api/v1/admin/questions/:id
 * @desc    Delete a question (soft delete)
 * @access  Admin
 */
export const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    return errorResponse(res, 'Question not found', 404);
  }

  // Soft delete - just mark as inactive
  question.isActive = false;
  await question.save();

  successResponse(res, null, 'Question deleted successfully');
});

/**
 * @route   POST /api/v1/admin/questions/bulk-delete
 * @desc    Delete multiple questions
 * @access  Admin
 */
export const bulkDeleteQuestions = asyncHandler(async (req, res) => {
  const { questionIds } = req.body;

  if (!questionIds || !Array.isArray(questionIds) || questionIds.length === 0) {
    return errorResponse(res, 'Please provide question IDs to delete', 400);
  }

  const result = await Question.updateMany(
    { _id: { $in: questionIds } },
    { isActive: false }
  );

  successResponse(
    res,
    { deletedCount: result.modifiedCount },
    `${result.modifiedCount} questions deleted successfully`
  );
});

/**
 * @route   POST /api/v1/admin/questions/upload
 * @desc    Upload question file (PDF/Excel) for parsing
 * @access  Admin
 */
export const uploadQuestionFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    return errorResponse(res, 'Please upload a file', 400);
  }

  const { subject, examName, examYear, sourceOrganization, tags } = req.body;

  // Upload file to S3
  const s3Result = await uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);

  // Create QuestionFile record
  const questionFile = await QuestionFile.create({
    originalName: req.file.originalname,
    fileName: s3Result.fileName,
    fileType: req.file.mimetype.includes('pdf') ? 'pdf' : 'excel',
    fileSize: req.file.size,
    s3Key: s3Result.key,
    s3Url: s3Result.url,
    subject,
    examName,
    examYear,
    sourceOrganization,
    tags: tags ? JSON.parse(tags) : [],
    uploadedBy: req.user.id,
    processingStatus: 'pending',
  });

  // Add to processing queue
  await addJobToQueue('question-files', {
    questionFileId: questionFile._id.toString(),
    filePath: s3Result.key,
    fileType: questionFile.fileType,
  });

  successResponse(
    res,
    questionFile,
    'File uploaded successfully and queued for processing',
    201
  );
});

/**
 * @route   GET /api/v1/admin/question-files
 * @desc    Get all uploaded question files
 * @access  Admin
 */
export const getQuestionFiles = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, processingStatus } = req.query;

  const query = {};
  if (processingStatus) query.processingStatus = processingStatus;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [files, total] = await Promise.all([
    QuestionFile.find(query)
      .populate('uploadedBy', 'firstName lastName email')
      .populate('reviewedBy', 'firstName lastName email')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    QuestionFile.countDocuments(query),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, files, pagination, 'Question files retrieved successfully');
});

/**
 * @route   GET /api/v1/admin/question-files/:id
 * @desc    Get question file processing status and parsed questions
 * @access  Admin
 */
export const getQuestionFileById = asyncHandler(async (req, res) => {
  const questionFile = await QuestionFile.findById(req.params.id)
    .populate('uploadedBy', 'firstName lastName email')
    .populate('reviewedBy', 'firstName lastName email');

  if (!questionFile) {
    return errorResponse(res, 'Question file not found', 404);
  }

  // Generate signed URL if needed
  if (questionFile.s3Key) {
    questionFile.signedUrl = await getSignedFileUrl(questionFile.s3Key);
  }

  successResponse(res, questionFile, 'Question file retrieved successfully');
});

/**
 * @route   POST /api/v1/admin/question-files/:id/review
 * @desc    Review and approve/reject parsed questions
 * @access  Admin
 */
export const reviewQuestionFile = asyncHandler(async (req, res) => {
  const questionFile = await QuestionFile.findById(req.params.id);

  if (!questionFile) {
    return errorResponse(res, 'Question file not found', 404);
  }

  if (questionFile.processingStatus !== 'completed') {
    return errorResponse(res, 'File processing is not completed yet', 400);
  }

  const { reviewNotes } = req.body;

  questionFile.processingStatus = 'review';
  questionFile.reviewNotes = reviewNotes;
  questionFile.reviewedBy = req.user.id;
  questionFile.reviewedAt = new Date();

  await questionFile.save();

  successResponse(res, questionFile, 'Question file marked for review');
});

/**
 * @route   PUT /api/v1/admin/question-files/:id/approve/:questionIndex
 * @desc    Approve a specific parsed question
 * @access  Admin
 */
export const approveParsedQuestion = asyncHandler(async (req, res) => {
  const { id, questionIndex } = req.params;

  const questionFile = await QuestionFile.findById(id);

  if (!questionFile) {
    return errorResponse(res, 'Question file not found', 404);
  }

  const parsedQuestion = questionFile.rawParsedQuestions[parseInt(questionIndex)];

  if (!parsedQuestion) {
    return errorResponse(res, 'Question not found in parsed data', 404);
  }

  // Create approved question in Question collection
  const question = await Question.create({
    ...parsedQuestion,
    sourceFile: questionFile._id,
    isVerified: true,
    verifiedBy: req.user.id,
    verifiedAt: new Date(),
  });

  // Update counts
  questionFile.approvedQuestionsCount += 1;
  await questionFile.save();

  successResponse(res, question, 'Question approved and added to question bank');
});

/**
 * @route   PUT /api/v1/admin/question-files/:id/reject/:questionIndex
 * @desc    Reject a specific parsed question
 * @access  Admin
 */
export const rejectParsedQuestion = asyncHandler(async (req, res) => {
  const { id, questionIndex } = req.params;

  const questionFile = await QuestionFile.findById(id);

  if (!questionFile) {
    return errorResponse(res, 'Question file not found', 404);
  }

  // Update counts
  questionFile.rejectedQuestionsCount += 1;
  await questionFile.save();

  successResponse(res, null, 'Question rejected');
});

/**
 * @route   GET /api/v1/admin/questions/stats
 * @desc    Get question statistics
 * @access  Admin
 */
export const getQuestionStats = asyncHandler(async (req, res) => {
  const stats = await Question.aggregate([
    {
      $facet: {
        bySubject: [
          { $group: { _id: '$subject', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ],
        byDifficulty: [
          { $group: { _id: '$difficulty', count: { $sum: 1 } } },
        ],
        byType: [
          { $group: { _id: '$questionType', count: { $sum: 1 } } },
        ],
        overview: [
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              active: { $sum: { $cond: ['$isActive', 1, 0] } },
              verified: { $sum: { $cond: ['$isVerified', 1, 0] } },
            },
          },
        ],
      },
    },
  ]);

  successResponse(res, stats[0], 'Question statistics retrieved successfully');
});
