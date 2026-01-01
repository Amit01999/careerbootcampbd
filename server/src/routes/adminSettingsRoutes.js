import express from 'express';
import * as settingsController from '../controllers/settingsController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin access
router.use(protect, restrictTo('admin', 'super_admin'));

// Settings management
router.get('/', settingsController.getAllSettings);
router.post('/', settingsController.createSetting);
router.get('/category/:category', settingsController.getSettingsByCategory);
router.get('/:key', settingsController.getSettingByKey);
router.put('/:key', settingsController.updateSetting);
router.delete('/:key', settingsController.deleteSetting);

// Bulk operations
router.post('/bulk-update', settingsController.bulkUpdateSettings);

// Reset (super admin only)
router.post('/reset-defaults', restrictTo('super_admin'), settingsController.resetToDefaults);

export default router;
