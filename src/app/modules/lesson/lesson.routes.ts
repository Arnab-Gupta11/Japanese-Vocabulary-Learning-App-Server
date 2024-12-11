import express from 'express';
import { LessonController } from './lesson.controller';
import validateRequest from '../../middlewares/validateRequest';
import { lessonValidationSchemas } from './lesson.validation';
// import { LessonController } from '../controllers/LessonController';

const router = express.Router();

// Lesson routes
router.post(
  '/',
  validateRequest(lessonValidationSchemas.createLessonValidationSchema),
  LessonController.createLesson,
);
router.get('/', LessonController.getAllLessons);
router.patch(
  '/:id',
  validateRequest(lessonValidationSchemas.updateLessonValidationSchema),
  LessonController.updateLesson,
);
router.delete('/:id', LessonController.deleteLesson);

export const LessonRoutes = router;
