import express from 'express';
import {
  adminGetAllModelTests, createModelTest,
  updateModelTest, deleteModelTest,
} from '../controllers/modelTestController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);
router.use(restrictTo('admin', 'super_admin'));

router.get('/', adminGetAllModelTests);
router.post('/', createModelTest);
router.put('/:id', updateModelTest);
router.delete('/:id', deleteModelTest);
export default router;
