import express from 'express';
import { getAllVivaPreparation, getVivaPreparationById } from '../controllers/vivaPreparationController.js';

const router = express.Router();

// Public routes
router.get('/', getAllVivaPreparation);
router.get('/:id', getVivaPreparationById);

export default router;
