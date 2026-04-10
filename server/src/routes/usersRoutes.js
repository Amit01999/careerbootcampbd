import express from 'express';
import * as userManagementController from '../controllers/userManagementController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// Admin-only list endpoint (alias for requirement: GET /api/users)
router.use(protect, restrictTo('admin', 'super_admin'));

router.get('/', userManagementController.getAllUsers);

export default router;

