import express from 'express';
import * as questionController from '../controllers/questionController.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// All routes require admin access
router.use(protect, restrictTo('admin', 'super_admin'));

// Question CRUD
router.post('/', questionController.createQuestion);
router.get('/', questionController.getQuestions);
router.get('/stats', questionController.getQuestionStats);
router.get('/:id', questionController.getQuestionById);
router.put('/:id', questionController.updateQuestion);
router.delete('/:id', questionController.deleteQuestion);

// Bulk operations
router.post('/bulk-delete', questionController.bulkDeleteQuestions);

// File upload and processing
router.post('/upload', upload.single('file'), questionController.uploadQuestionFile);
router.get('/files', questionController.getQuestionFiles);
router.get('/files/:id', questionController.getQuestionFileById);
router.post('/files/:id/review', questionController.reviewQuestionFile);
router.put('/files/:id/approve/:questionIndex', questionController.approveParsedQuestion);
router.put('/files/:id/reject/:questionIndex', questionController.rejectParsedQuestion);

export default router;
