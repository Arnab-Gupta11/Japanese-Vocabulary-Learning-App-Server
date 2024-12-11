import { model, Schema } from 'mongoose';
import { TVocabulary } from './vocabulary.interface';

const vocabularySchema = new Schema<TVocabulary>({
  word: { type: String, required: true },
  pronunciation: { type: String, required: true },
  whenToSay: { type: String, required: true },
  lessonNo: { type: Number, required: true, ref: 'Lesson' }, // References Lesson model by lesson number
  adminEmail: { type: String, required: true },
});

export const Vocabulary = model<TVocabulary>('Vocabulary', vocabularySchema);
