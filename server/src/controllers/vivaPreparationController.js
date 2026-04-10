import VivaPreparation from '../models/VivaPreparation.js';
import { asyncHandler } from '../middleware/error.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';

/**
 * @route   GET /api/v1/viva-preparation
 * @desc    Get all active viva preparation headlines
 * @access  Public
 */
export const getAllVivaPreparation = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const query = { isActive: true };

  const [items, total] = await Promise.all([
    VivaPreparation.find(query)
      .select('headline createdAt')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    VivaPreparation.countDocuments(query),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, items, pagination, 'Viva Preparation items retrieved successfully');
});

/**
 * @route   GET /api/v1/viva-preparation/:id
 * @desc    Get single viva preparation content by ID
 * @access  Public
 */
export const getVivaPreparationById = asyncHandler(async (req, res) => {
  const item = await VivaPreparation.findOne({
    _id: req.params.id,
    isActive: true,
  }).lean();

  if (!item) {
    return errorResponse(res, 'Content not found', 404);
  }

  successResponse(res, item, 'Content retrieved successfully');
});

/**
 * @route   POST /api/v1/admin/viva-preparation
 * @desc    Create new viva preparation content
 * @access  Admin
 */
export const createVivaPreparation = asyncHandler(async (req, res) => {
  const { headline, content } = req.body;

  if (!headline || !content) {
    return errorResponse(res, 'Headline and content are required', 400);
  }

  const item = await VivaPreparation.create({
    headline: headline.trim(),
    content,
    createdBy: req.user._id,
  });

  successResponse(res, item, 'Content created successfully', 201);
});

/**
 * @route   PUT /api/v1/admin/viva-preparation/:id
 * @desc    Update viva preparation content
 * @access  Admin
 */
export const updateVivaPreparation = asyncHandler(async (req, res) => {
  const { headline, content } = req.body;

  if (!headline || !content) {
    return errorResponse(res, 'Headline and content are required', 400);
  }

  const item = await VivaPreparation.findByIdAndUpdate(
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
 * @route   DELETE /api/v1/admin/viva-preparation/:id
 * @desc    Permanently delete viva preparation content
 * @access  Admin
 */
export const deleteVivaPreparation = asyncHandler(async (req, res) => {
  const item = await VivaPreparation.findByIdAndDelete(req.params.id);

  if (!item) {
    return errorResponse(res, 'Content not found', 404);
  }

  successResponse(res, null, 'Content deleted successfully');
});

/**
 * @route   GET /api/v1/admin/viva-preparation
 * @desc    Get all viva preparation content (including inactive) for admin
 * @access  Admin
 */
export const adminGetAllVivaPreparation = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [items, total] = await Promise.all([
    VivaPreparation.find()
      .select('headline isActive createdAt')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    VivaPreparation.countDocuments(),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    pages: Math.ceil(total / parseInt(limit)),
  };

  paginatedResponse(res, items, pagination, 'Admin: Viva Preparation items retrieved');
});
