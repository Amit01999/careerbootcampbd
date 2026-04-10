import express from 'express';
import { getAllModelTests, getModelTestById } from '../controllers/modelTestController.js';

const router = express.Router();
router.get('/', getAllModelTests);
router.get('/:id', getModelTestById);
export default router;
