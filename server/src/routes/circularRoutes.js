import express from 'express';
import * as circularController from '../controllers/circularController.js';
import { protect, optionalAuth, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', circularController.getCirculars);
router.get('/:idOrSlug', circularController.getCircularById);

// Student routes (protected)
router.post('/:id/save', protect, circularController.saveCircular);
router.get('/saved', protect, circularController.getSavedCirculars);

export default router;
