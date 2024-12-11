import ApiError from '../../errors/ApiError';
import { TLesson } from './lesson.interface';
import { Lesson } from './lesson.model';

//Create a lesson into DB
const createLessonIntoDB = async (lessonData: Partial<TLesson>) => {
  const existingLesson = await Lesson.findOne({
    lessonNumber: lessonData.lessonNumber,
  });
  if (existingLesson) {
    throw new ApiError(409, 'Lesson number already exists');
  }
  const lesson = new Lesson(lessonData);
  return await lesson.save();
};
//Get all lesson from DB
const getAllLessonsFromDB = async () => {
  return await Lesson.find();
};

//Updata lesson into DB
const updateLessonIntoDB = async (id: string, data: Partial<TLesson>) => {
  const updatedLesson = await Lesson.findByIdAndUpdate(
    id,
    { $set: data }, // Update only provided fields
    { new: true, runValidators: true },
  );
  if (!updatedLesson) {
    throw new ApiError(404, 'Lesson not found');
  }
  return updatedLesson;
};
//delete lesson from DB
const deleteLessonFromDB = async (id: string) => {
  const lesson = await Lesson.findByIdAndDelete(id);
  if (!lesson) {
    throw new ApiError(404, 'Lesson not found');
  }
};
export const LessonServices = {
  createLessonIntoDB,
  updateLessonIntoDB,
  getAllLessonsFromDB,
  deleteLessonFromDB,
};
