import express from 'express';
import {
  createBankRecruitment,
  deleteBankRecruitment,
  getAllBankRecruitments,
  getBankRecruitmentById,
  updateBankRecruitment,
} from '../controllers/bankRecruitmentController.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { uploadSingleImage, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

// Public
router.get('/', getAllBankRecruitments);
router.get('/:id', getBankRecruitmentById);

// Admin-protected (to satisfy requested REST paths)
router.post('/', protect, restrictTo('admin', 'super_admin'), uploadSingleImage('logo'), handleUploadError, createBankRecruitment);
router.put('/:id', protect, restrictTo('admin', 'super_admin'), uploadSingleImage('logo'), handleUploadError, updateBankRecruitment);
router.delete('/:id', protect, restrictTo('admin', 'super_admin'), deleteBankRecruitment);

export default router;

