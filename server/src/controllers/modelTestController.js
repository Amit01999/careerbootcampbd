import ModelTest from '../models/ModelTest.js';
import { asyncHandler } from '../middleware/error.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';

/** GET /api/v1/model-tests — public list (no content/questions) */
export const getAllModelTests = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [items, total] = await Promise.all([
    ModelTest.find({ isActive: true })
      .select('modelTestNo post time mark totalQuestions createdAt')
      .sort('modelTestNo')
      .skip(skip).limit(parseInt(limit)).lean(),
    ModelTest.countDocuments({ isActive: true }),
  ]);

  paginatedResponse(res, items, { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) }, 'Model tests retrieved successfully');
});

/** GET /api/v1/model-tests/:id — public full detail */
export const getModelTestById = asyncHandler(async (req, res) => {
  const item = await ModelTest.findOne({ _id: req.params.id, isActive: true }).lean();
  if (!item) return errorResponse(res, 'Model test not found', 404);
  successResponse(res, item, 'Model test retrieved successfully');
});

/** POST /api/v1/admin/model-tests — create */
export const createModelTest = asyncHandler(async (req, res) => {
  const { modelTestNo, post, time, mark, totalQuestions, content, questions } = req.body;
  if (!modelTestNo || !post || !content) return errorResponse(res, 'modelTestNo, post and content are required', 400);

  const item = await ModelTest.create({
    modelTestNo: modelTestNo.toString().trim(),
    post: post.trim(), time, mark, totalQuestions,
    content, questions: questions || [],
    createdBy: req.user._id,
  });
  successResponse(res, item, 'Model test created successfully', 201);
});

/** PUT /api/v1/admin/model-tests/:id — update */
export const updateModelTest = asyncHandler(async (req, res) => {
  const { modelTestNo, post, time, mark, totalQuestions, content, questions } = req.body;
  if (!modelTestNo || !post || !content) return errorResponse(res, 'modelTestNo, post and content are required', 400);

  const item = await ModelTest.findByIdAndUpdate(
    req.params.id,
    { modelTestNo: modelTestNo.toString().trim(), post: post.trim(), time, mark, totalQuestions, content, questions: questions || [] },
    { new: true, runValidators: true }
  );
  if (!item) return errorResponse(res, 'Model test not found', 404);
  successResponse(res, item, 'Model test updated successfully');
});

/** DELETE /api/v1/admin/model-tests/:id — permanent delete */
export const deleteModelTest = asyncHandler(async (req, res) => {
  const item = await ModelTest.findByIdAndDelete(req.params.id);
  if (!item) return errorResponse(res, 'Model test not found', 404);
  successResponse(res, null, 'Model test deleted successfully');
});

/** GET /api/v1/admin/model-tests — admin list (incl. inactive) */
export const adminGetAllModelTests = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [items, total] = await Promise.all([
    ModelTest.find()
      .select('modelTestNo post time mark totalQuestions isActive createdAt')
      .sort('modelTestNo').skip(skip).limit(parseInt(limit)).lean(),
    ModelTest.countDocuments(),
  ]);

  paginatedResponse(res, items, { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) }, 'Admin: Model tests retrieved');
});
