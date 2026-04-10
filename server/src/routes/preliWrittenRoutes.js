import express from 'express';
import { getAllPreliWritten, getPreliWrittenById } from '../controllers/preliWrittenController.js';

const router = express.Router();

// Public routes
router.get('/', getAllPreliWritten);
router.get('/:id', getPreliWrittenById);

export default router;
