import { model, Schema } from 'mongoose';
import { TVocabulary } from './vocabulary.interface';
import { Lesson } from '../lesson/lesson.model';
import ApiError from '../../errors/ApiError';

const vocabularySchema = new Schema<TVocabulary>({
  word: { type: String, required: true },
  meaning: { type: String, required: true, trim: true }, // Added new field
  pronunciation: { type: String, required: true },
  whenToSay: { type: String, required: true },
  lessonNo: { type: String, required: true, ref: 'Lesson' }, // References Lesson model by lesson number
  adminEmail: { type: String, required: true },
});
// Pre-save middleware to check if lesson number exists
vocabularySchema.pre('save', async function (next) {
  const vocabulary = this as TVocabulary;

  // Check if the lesson number exists
  const lesson = await Lesson.findOne({ lessonNumber: vocabulary.lessonNo });
  if (!lesson) {
    return next(new ApiError(400, 'Lesson number does not exist'));
  }

  next();
});
export const Vocabulary = model<TVocabulary>('Vocabulary', vocabularySchema);
