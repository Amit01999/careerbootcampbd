import { Exam, Question } from '../models/index.js';
import { asyncHandler } from '../middleware/error.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import slugify from 'slugify';

/**
 * @route   POST /api/v1/admin/exams
 * @desc    Create new exam
 * @access  Admin
 */
export const createExam = asyncHandler(async (req, res) => {
  const examData = {
    ...req.body,
    slug: slugify(req.body.title, { lower: true, strict: true }),
    createdBy: req.user.id,
    isPublished: false, // Exams start as drafts
  };

  const exam = await Exam.create(examData);

  successResponse(res, exam, 'Exam created successfully', 201);
});

/**
 * @route   GET /api/v1/admin/exams
 * @desc    Get all exams (including drafts) for admin
 * @access  Admin
 */
export const getAllExamsAdmin = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    examType,
    category,
    isPublished,
    isFree,
    search,
    sortBy = '-createdAt',
  } = req.query;

  const query = {};

  if (examType) query.examType = examType;
  if (category) query.category = category;
  if (isPublished !== undefined) query.isPublished = isPublished === 'true';
  if (isFree !== undefined) query.isFree = isFree === 'true';

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { titleBn: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [exams, total] = await Promise.all([
    Exam.find(query)
      .populate('createdBy', 'firstName lastName email')
      .sort(sortBy)
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Exam.countDocuments(query),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, exams, pagination, 'Exams retrieved successfully');
});

/**
 * @route   GET /api/v1/admin/exams/:id
 * @desc    Get exam by ID for editing
 * @access  Admin
 */
export const getExamByIdAdmin = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id)
    .populate('createdBy', 'firstName lastName email')
    .populate('updatedBy', 'firstName lastName email');

  if (!exam) {
    return errorResponse(res, 'Exam not found', 404);
  }

  successResponse(res, exam, 'Exam retrieved successfully');
});

/**
 * @route   PUT /api/v1/admin/exams/:id
 * @desc    Update exam
 * @access  Admin
 */
export const updateExam = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    return errorResponse(res, 'Exam not found', 404);
  }

  // Update slug if title changed
  if (req.body.title && req.body.title !== exam.title) {
    req.body.slug = slugify(req.body.title, { lower: true, strict: true });
  }

  req.body.updatedBy = req.user.id;

  Object.assign(exam, req.body);
  await exam.save();

  successResponse(res, exam, 'Exam updated successfully');
});

/**
 * @route   DELETE /api/v1/admin/exams/:id
 * @desc    Delete exam (soft delete)
 * @access  Admin
 */
export const deleteExam = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    return errorResponse(res, 'Exam not found', 404);
  }

  exam.isActive = false;
  await exam.save();

  successResponse(res, null, 'Exam deleted successfully');
});

/**
 * @route   PATCH /api/v1/admin/exams/:id/publish
 * @desc    Publish exam
 * @access  Admin
 */
export const publishExam = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    return errorResponse(res, 'Exam not found', 404);
  }

  // Validate exam has sections
  if (!exam.sections || exam.sections.length === 0) {
    return errorResponse(res, 'Cannot publish exam without sections', 400);
  }

  // Validate enough questions exist for each section
  for (const section of exam.sections) {
    const questionCount = await Question.countDocuments({
      subject: section.subject,
      isActive: true,
      isVerified: true,
    });

    if (questionCount < section.questionsCount) {
      return errorResponse(
        res,
        `Not enough verified questions for ${section.name}. Required: ${section.questionsCount}, Available: ${questionCount}`,
        400
      );
    }
  }

  exam.isPublished = true;
  exam.publishedAt = exam.publishedAt || new Date();
  await exam.save();

  successResponse(res, exam, 'Exam published successfully');
});

/**
 * @route   PATCH /api/v1/admin/exams/:id/unpublish
 * @desc    Unpublish exam
 * @access  Admin
 */
export const unpublishExam = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    return errorResponse(res, 'Exam not found', 404);
  }

  exam.isPublished = false;
  await exam.save();

  successResponse(res, exam, 'Exam unpublished successfully');
});

/**
 * @route   GET /api/v1/admin/exams/:id/statistics
 * @desc    Get detailed exam statistics
 * @access  Admin
 */
export const getExamStatistics = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    return errorResponse(res, 'Exam not found', 404);
  }

  const stats = {
    basic: {
      totalAttempts: exam.totalAttempts,
      totalStudents: exam.totalStudents,
      averageScore: exam.averageScore,
      highestScore: exam.highestScore,
      lowestScore: exam.lowestScore,
      averageTime: exam.averageTime,
    },
  };

  successResponse(res, stats, 'Exam statistics retrieved successfully');
});

/**
 * @route   POST /api/v1/admin/exams/:id/duplicate
 * @desc    Duplicate an exam
 * @access  Admin
 */
export const duplicateExam = asyncHandler(async (req, res) => {
  const originalExam = await Exam.findById(req.params.id).lean();

  if (!originalExam) {
    return errorResponse(res, 'Exam not found', 404);
  }

  // Remove fields that shouldn't be duplicated
  delete originalExam._id;
  delete originalExam.slug;
  delete originalExam.totalAttempts;
  delete originalExam.totalStudents;
  delete originalExam.averageScore;
  delete originalExam.highestScore;
  delete originalExam.lowestScore;
  delete originalExam.createdAt;
  delete originalExam.updatedAt;

  // Create new exam with modified title
  const duplicateData = {
    ...originalExam,
    title: `${originalExam.title} (Copy)`,
    titleBn: originalExam.titleBn ? `${originalExam.titleBn} (কপি)` : undefined,
    slug: slugify(`${originalExam.title}-copy-${Date.now()}`, { lower: true, strict: true }),
    isPublished: false,
    createdBy: req.user.id,
  };

  const newExam = await Exam.create(duplicateData);

  successResponse(res, newExam, 'Exam duplicated successfully', 201);
});

/**
 * @route   GET /api/v1/admin/exams/validate-sections/:id
 * @desc    Validate exam sections have enough questions
 * @access  Admin
 */
export const validateExamSections = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    return errorResponse(res, 'Exam not found', 404);
  }

  const validation = [];

  for (const section of exam.sections) {
    const questionCount = await Question.countDocuments({
      subject: section.subject,
      isActive: true,
      isVerified: true,
    });

    validation.push({
      section: section.name,
      subject: section.subject,
      required: section.questionsCount,
      available: questionCount,
      isValid: questionCount >= section.questionsCount,
    });
  }

  const allValid = validation.every((v) => v.isValid);

  successResponse(
    res,
    {
      isValid: allValid,
      sections: validation,
    },
    'Exam sections validated'
  );
});
