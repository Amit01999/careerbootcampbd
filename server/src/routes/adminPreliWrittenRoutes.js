import express from 'express';
import {
  adminGetAllPreliWritten,
  createPreliWritten,
  updatePreliWritten,
  deletePreliWritten,
} from '../controllers/preliWrittenController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(restrictTo('admin', 'super_admin'));

router.get('/', adminGetAllPreliWritten);
router.post('/', createPreliWritten);
router.put('/:id', updatePreliWritten);
router.delete('/:id', deletePreliWritten);

export default router;
