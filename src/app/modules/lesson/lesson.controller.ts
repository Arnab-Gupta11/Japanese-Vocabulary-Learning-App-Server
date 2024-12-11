import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TLesson } from './lesson.interface';
import { LessonServices } from './lesson.service';

const createLesson = catchAsync(async (req, res) => {
  const { lessonName, lessonNumber }: TLesson = req.body;
  const result = await LessonServices.createLessonIntoDB({
    lessonName,
    lessonNumber,
  });
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Lesson created successfully',
    data: result,
  });
});
const getAllLessons = catchAsync(async (req, res) => {
  const lessons = await LessonServices.getAllLessonsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Lessons fetched successfully',
    data: lessons,
  });
});

const updateLesson = catchAsync(async (req, res) => {
  const { lessonName, lessonNumber }: TLesson = req.body;
  const { id } = req.params;
  const updatedLesson = await LessonServices.updateLessonIntoDB(id, {
    lessonName,
    lessonNumber,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Lesson updated successfully',
    data: updatedLesson,
  });
});

const deleteLesson = catchAsync(async (req, res) => {
  const { id } = req.params;
  await LessonServices.deleteLessonFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Lesson deleted successfully',
    data: '',
  });
});

export const LessonController = {
  createLesson,
  getAllLessons,
  updateLesson,
  deleteLesson,
};
