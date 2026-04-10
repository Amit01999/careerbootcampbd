import express from 'express';
import { getAllJobSolutions, getJobSolutionById } from '../controllers/jobSolutionController.js';

const router = express.Router();

router.get('/', getAllJobSolutions);
router.get('/:id', getJobSolutionById);

export default router;
