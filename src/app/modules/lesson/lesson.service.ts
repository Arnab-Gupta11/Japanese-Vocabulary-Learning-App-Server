import ApiError from '../../errors/ApiError';
import { Vocabulary } from '../vocabulary/vocabulary.model';
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
//get single User
const getSingleLessonFromDB = async (id: string) => {
  const user = await Lesson.findOne({ lessonNumber: id });
  if (!user) {
    throw new ApiError(404, 'Lesson not found');
  }
  return user;
};
//Updata lesson into DB
const updateLessonIntoDB = async (id: string, data: Partial<TLesson>) => {
  // Find the existing lesson
  const existingLesson = await Lesson.findById(id);
  if (!existingLesson) throw new Error('Lesson not found');

  const { lessonNumber: newLessonNumber } = data;
  const oldLessonNumber = existingLesson.lessonNumber;

  // Update the lesson details
  const updatedLesson = await Lesson.findByIdAndUpdate(
    id,
    { $set: data }, // Update only provided fields
    { new: true, runValidators: true },
  );

  // If the lesson number has been updated, update all vocabularies that refer to this lesson
  if (newLessonNumber && newLessonNumber !== oldLessonNumber) {
    await Vocabulary.updateMany(
      { lessonNo: oldLessonNumber },
      { lessonNo: newLessonNumber },
    );
  }

  return updatedLesson;
  // const updatedLesson = await Lesson.findByIdAndUpdate(
  //   id,
  //   { $set: data }, // Update only provided fields
  //   { new: true, runValidators: true },
  // );
  // if (!updatedLesson) {
  //   throw new ApiError(404, 'Lesson not found');
  // }
  // return updatedLesson;
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
  getSingleLessonFromDB,
};
