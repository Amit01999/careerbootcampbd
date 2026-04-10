import express from 'express';
import {
  adminGetAllJobSolutions,
  createJobSolution,
  updateJobSolution,
  deleteJobSolution,
} from '../controllers/jobSolutionController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin', 'super_admin'));

router.get('/', adminGetAllJobSolutions);
router.post('/', createJobSolution);
router.put('/:id', updateJobSolution);
router.delete('/:id', deleteJobSolution);

export default router;
