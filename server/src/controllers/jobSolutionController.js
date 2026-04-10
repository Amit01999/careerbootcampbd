import JobSolution from '../models/JobSolution.js';
import { asyncHandler } from '../middleware/error.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';

/**
 * @route   GET /api/v1/job-solutions
 * @desc    Get all active job solutions (list — excludes heavy fields)
 * @access  Public
 */
export const getAllJobSolutions = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [items, total] = await Promise.all([
    JobSolution.find({ isActive: true })
      .select('bankName post time mark totalQuestions createdAt')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    JobSolution.countDocuments({ isActive: true }),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, items, pagination, 'Job solutions retrieved successfully');
});

/**
 * @route   GET /api/v1/job-solutions/:id
 * @desc    Get full job solution details (content + questions)
 * @access  Public
 */
export const getJobSolutionById = asyncHandler(async (req, res) => {
  const item = await JobSolution.findOne({
    _id: req.params.id,
    isActive: true,
  }).lean();

  if (!item) {
    return errorResponse(res, 'Job solution not found', 404);
  }

  successResponse(res, item, 'Job solution retrieved successfully');
});

/**
 * @route   POST /api/v1/admin/job-solutions
 * @desc    Create new job solution
 * @access  Admin
 */
export const createJobSolution = asyncHandler(async (req, res) => {
  const { bankName, post, time, mark, totalQuestions, content, questions } = req.body;

  if (!bankName || !post || !content) {
    return errorResponse(res, 'bankName, post and content are required', 400);
  }

  const item = await JobSolution.create({
    bankName: bankName.trim(),
    post: post.trim(),
    time,
    mark,
    totalQuestions,
    content,
    questions: questions || [],
    createdBy: req.user._id,
  });

  successResponse(res, item, 'Job solution created successfully', 201);
});

/**
 * @route   PUT /api/v1/admin/job-solutions/:id
 * @desc    Update job solution
 * @access  Admin
 */
export const updateJobSolution = asyncHandler(async (req, res) => {
  const { bankName, post, time, mark, totalQuestions, content, questions } = req.body;

  if (!bankName || !post || !content) {
    return errorResponse(res, 'bankName, post and content are required', 400);
  }

  const item = await JobSolution.findByIdAndUpdate(
    req.params.id,
    { bankName: bankName.trim(), post: post.trim(), time, mark, totalQuestions, content, questions: questions || [] },
    { new: true, runValidators: true }
  );

  if (!item) {
    return errorResponse(res, 'Job solution not found', 404);
  }

  successResponse(res, item, 'Job solution updated successfully');
});

/**
 * @route   DELETE /api/v1/admin/job-solutions/:id
 * @desc    Permanently delete job solution
 * @access  Admin
 */
export const deleteJobSolution = asyncHandler(async (req, res) => {
  const item = await JobSolution.findByIdAndDelete(req.params.id);

  if (!item) {
    return errorResponse(res, 'Job solution not found', 404);
  }

  successResponse(res, null, 'Job solution deleted successfully');
});

/**
 * @route   GET /api/v1/admin/job-solutions
 * @desc    Get all job solutions including inactive (admin)
 * @access  Admin
 */
export const adminGetAllJobSolutions = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [items, total] = await Promise.all([
    JobSolution.find()
      .select('bankName post time mark totalQuestions isActive createdAt')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    JobSolution.countDocuments(),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, items, pagination, 'Admin: Job solutions retrieved');
});
