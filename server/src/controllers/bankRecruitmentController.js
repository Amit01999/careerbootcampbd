import { asyncHandler } from '../middleware/error.js';
import { errorResponse, paginatedResponse, successResponse } from '../utils/response.js';
import * as bankRecruitmentService from '../services/bankRecruitmentService.js';
import { deleteImageByPublicId, uploadImage } from '../services/cloudinaryService.js';
import BankRecruitment from '../models/BankRecruitment.js';

/**
 * @route   GET /api/v1/bank-recruitments
 * @access  Public
 */
export const getAllBankRecruitments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  const { items, pagination } = await bankRecruitmentService.listPublic({ page, limit });
  paginatedResponse(res, items, pagination, 'Bank recruitments retrieved successfully');
});

/**
 * @route   GET /api/v1/bank-recruitments/:id
 * @access  Public
 */
export const getBankRecruitmentById = asyncHandler(async (req, res) => {
  const item = await bankRecruitmentService.getPublicById(req.params.id);
  if (!item) return errorResponse(res, 'Recruitment not found', 404);
  successResponse(res, item, 'Recruitment retrieved successfully');
});

/**
 * @route   GET /api/v1/admin/bank-recruitments
 * @access  Admin
 */
export const adminGetAllBankRecruitments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  const { items, pagination } = await bankRecruitmentService.adminListAll({ page, limit });
  paginatedResponse(res, items, pagination, 'Admin: Bank recruitments retrieved');
});

/**
 * @route   POST /api/v1/bank-recruitments (admin-protected alias)
 * @route   POST /api/v1/admin/bank-recruitments
 * @access  Admin
 */
export const createBankRecruitment = asyncHandler(async (req, res) => {
  const { bankName, positionTitle, details } = req.body;

  if (!bankName?.trim() || !positionTitle?.trim() || !details?.trim()) {
    return errorResponse(res, 'bankName, positionTitle and details are required', 400);
  }
  if (!req.file) {
    return errorResponse(res, 'Bank logo image is required', 400);
  }

  const upload = await uploadImage({
    filePath: req.file.path,
    folder: 'private-bank-bootcamp/bank-recruitments',
  });

  const item = await bankRecruitmentService.create({
    bankLogoUrl: upload.url,
    bankLogoPublicId: upload.publicId,
    bankName: bankName.trim(),
    positionTitle: positionTitle.trim(),
    details: details.trim(),
    createdBy: req.user?._id,
  });

  successResponse(res, item, 'Recruitment created successfully', 201);
});

/**
 * @route   PUT /api/v1/bank-recruitments/:id (admin-protected alias)
 * @route   PUT /api/v1/admin/bank-recruitments/:id
 * @access  Admin
 */
export const updateBankRecruitment = asyncHandler(async (req, res) => {
  const { bankName, positionTitle, details } = req.body;

  if (!bankName?.trim() || !positionTitle?.trim() || !details?.trim()) {
    return errorResponse(res, 'bankName, positionTitle and details are required', 400);
  }

  const existing = await BankRecruitment.findById(req.params.id);
  if (!existing) return errorResponse(res, 'Recruitment not found', 404);

  const { bankLogoUrl: existingLogoUrl, bankLogoPublicId: existingLogoPublicId } = existing;
  let bankLogoUrl = existingLogoUrl;
  let bankLogoPublicId = existingLogoPublicId;

  if (req.file) {
    const upload = await uploadImage({
      filePath: req.file.path,
      folder: 'private-bank-bootcamp/bank-recruitments',
    });
    // best-effort delete old image
    try {
      await deleteImageByPublicId(existing.bankLogoPublicId);
    } catch {
      // ignore
    }
    bankLogoUrl = upload.url;
    bankLogoPublicId = upload.publicId;
  }

  const updated = await bankRecruitmentService.updateById(req.params.id, {
    bankLogoUrl,
    bankLogoPublicId,
    bankName: bankName.trim(),
    positionTitle: positionTitle.trim(),
    details: details.trim(),
  });

  successResponse(res, updated, 'Recruitment updated successfully');
});
/**
 * @route   DELETE /api/v1/bank-recruitments/:id (admin-protected alias)
 * @route   DELETE /api/v1/admin/bank-recruitments/:id
 * @access  Admin
 */
export const deleteBankRecruitment = asyncHandler(async (req, res) => {
  const item = await bankRecruitmentService.deleteById(req.params.id);
  if (!item) return errorResponse(res, 'Recruitment not found', 404);
  successResponse(res, null, 'Recruitment deleted successfully');
});

