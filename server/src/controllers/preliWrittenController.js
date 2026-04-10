import PreliWritten from '../models/PreliWritten.js';
import { asyncHandler } from '../middleware/error.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';

/**
 * @route   GET /api/v1/preli-written
 * @desc    Get all active preli & written headlines
 * @access  Public
 */
export const getAllPreliWritten = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const query = { isActive: true };

  const [items, total] = await Promise.all([
    PreliWritten.find(query)
      .select('headline createdAt')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    PreliWritten.countDocuments(query),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, items, pagination, 'Preli & Written items retrieved successfully');
});

/**
 * @route   GET /api/v1/preli-written/:id
 * @desc    Get single preli & written content by ID
 * @access  Public
 */
export const getPreliWrittenById = asyncHandler(async (req, res) => {
  const item = await PreliWritten.findOne({
    _id: req.params.id,
    isActive: true,
  }).lean();

  if (!item) {
    return errorResponse(res, 'Content not found', 404);
  }

  successResponse(res, item, 'Content retrieved successfully');
});

/**
 * @route   POST /api/v1/admin/preli-written
 * @desc    Create new preli & written content
 * @access  Admin
 */
export const createPreliWritten = asyncHandler(async (req, res) => {
  const { headline, content } = req.body;

  if (!headline || !content) {
    return errorResponse(res, 'Headline and content are required', 400);
  }

  const item = await PreliWritten.create({
    headline: headline.trim(),
    content,
    createdBy: req.user._id,
  });

  successResponse(res, item, 'Content created successfully', 201);
});

/**
 * @route   PUT /api/v1/admin/preli-written/:id
 * @desc    Update preli & written content
 * @access  Admin
 */
export const updatePreliWritten = asyncHandler(async (req, res) => {
  const { headline, content } = req.body;

  if (!headline || !content) {
    return errorResponse(res, 'Headline and content are required', 400);
  }

  const item = await PreliWritten.findByIdAndUpdate(
    req.params.id,
    { headline: headline.trim(), content },
    { new: true, runValidators: true }
  );

  if (!item) {
    return errorResponse(res, 'Content not found', 404);
  }

  successResponse(res, item, 'Content updated successfully');
});

/**
 * @route   DELETE /api/v1/admin/preli-written/:id
 * @desc    Soft-delete preli & written content
 * @access  Admin
 */
export const deletePreliWritten = asyncHandler(async (req, res) => {
  const item = await PreliWritten.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!item) {
    return errorResponse(res, 'Content not found', 404);
  }

  successResponse(res, null, 'Content deleted successfully');
});

/**
 * @route   GET /api/v1/admin/preli-written
 * @desc    Get all preli & written content (including inactive) for admin
 * @access  Admin
 */
export const adminGetAllPreliWritten = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [items, total] = await Promise.all([
    PreliWritten.find()
      .select('headline isActive createdAt')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    PreliWritten.countDocuments(),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, items, pagination, 'Admin: Preli & Written items retrieved');
});
