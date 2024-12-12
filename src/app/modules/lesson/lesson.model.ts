import mongoose from 'mongoose';
import { TLesson } from './lesson.interface';
import { Vocabulary } from '../vocabulary/vocabulary.model';

const LessonSchema = new mongoose.Schema(
  {
    lessonName: {
      type: String,
      required: true,
      unique: true,
    },
    lessonNumber: {
      type: String,
      required: true,
      unique: true,
    },
    vocabularyCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
// Middleware to delete vocabularies associated with a lesson
LessonSchema.pre('findOneAndDelete', async function (next) {
  const lesson = await this.model.findOne(this.getFilter());
  if (lesson) {
    await Vocabulary.deleteMany({ lessonNo: lesson.lessonNumber });
  }
  next();
});
export const Lesson = mongoose.model<TLesson>('Lesson', LessonSchema);
