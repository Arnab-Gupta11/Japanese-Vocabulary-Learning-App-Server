import mongoose from 'mongoose';
import { TLesson } from './lesson.interface';

const LessonSchema = new mongoose.Schema(
  {
    lessonName: {
      type: String,
      required: true,
      unique: true,
    },
    lessonNumber: {
      type: Number,
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

export const Lesson = mongoose.model<TLesson>('Lesson', LessonSchema);
