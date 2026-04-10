import express from 'express';
import {
  adminGetAllVivaPreparation,
  createVivaPreparation,
  updateVivaPreparation,
  deleteVivaPreparation,
} from '../controllers/vivaPreparationController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin', 'super_admin'));

router.get('/', adminGetAllVivaPreparation);
router.post('/', createVivaPreparation);
router.put('/:id', updateVivaPreparation);
router.delete('/:id', deleteVivaPreparation);

export default router;
