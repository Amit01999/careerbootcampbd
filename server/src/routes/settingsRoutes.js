import express from 'express';
import * as settingsController from '../controllers/settingsController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', settingsController.getPublicSettings);

export default router;
