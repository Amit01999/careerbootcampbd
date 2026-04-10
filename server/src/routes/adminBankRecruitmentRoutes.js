import express from 'express';
import {
  adminGetAllBankRecruitments,
  createBankRecruitment,
  deleteBankRecruitment,
  updateBankRecruitment,
} from '../controllers/bankRecruitmentController.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { uploadSingleImage, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin', 'super_admin'));

router.get('/', adminGetAllBankRecruitments);
router.post('/', uploadSingleImage('logo'), handleUploadError, createBankRecruitment);
router.put('/:id', uploadSingleImage('logo'), handleUploadError, updateBankRecruitment);
router.delete('/:id', deleteBankRecruitment);

export default router;

