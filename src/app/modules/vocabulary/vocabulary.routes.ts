import { Router } from 'express';
import { VocabularyController } from './vocabulary.controller';
import validateRequest from '../../middlewares/validateRequest';
import { VocabularyValidations } from './vocabulary.validation';

const router = Router();

// Vocabulary routes
router.post(
  '/',
  validateRequest(VocabularyValidations.createVocabularyValidationSchema),
  VocabularyController.createVocabulary,
);
router.get('/', VocabularyController.getAllVocabularies);
router.patch(
  '/:id',
  validateRequest(VocabularyValidations.updateVocabularyValidationSchema),
  VocabularyController.updateVocabulary,
);
router.delete('/:id', VocabularyController.deleteVocabulary);

export const VocabularyRoutes = router;
