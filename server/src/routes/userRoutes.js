import express from 'express';
import * as userManagementController from '../controllers/userManagementController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin access
router.use(protect, restrictTo('admin', 'super_admin'));

// User management
router.get('/', userManagementController.getAllUsers);
router.get('/:id', userManagementController.getUserById);

// User status management
router.patch('/:id/activate', userManagementController.activateUser);
router.patch('/:id/deactivate', userManagementController.deactivateUser);
router.patch('/:id/block', userManagementController.blockUser);
router.patch('/:id/unblock', userManagementController.unblockUser);

// Role management (super admin only)
router.put('/:id/role', restrictTo('super_admin'), userManagementController.changeUserRole);

// Delete user (super admin only)
router.delete('/:id', restrictTo('super_admin'), userManagementController.deleteUser);

// User details
router.get('/:id/activity', userManagementController.getUserActivity);
router.get('/:id/payments', userManagementController.getUserPayments);
router.get('/:id/exams', userManagementController.getUserExamAttempts);

export default router;
