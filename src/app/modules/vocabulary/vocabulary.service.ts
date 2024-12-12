import ApiError from '../../errors/ApiError';
import { Lesson } from '../lesson/lesson.model';
import { TPaginatedResult, TVocabulary } from './vocabulary.interface';
import { Vocabulary } from './vocabulary.model';

const createVocabularyIntoDB = async (vocabularyData: TVocabulary) => {
  // Create a new vocabulary
  const vocabulary = await Vocabulary.create(vocabularyData);

  // Update the vocabulary count for the related lesson
  await Lesson.findOneAndUpdate(
    { lessonNumber: vocabulary.lessonNo },
    { $inc: { vocabularyCount: 1 } }, // Increment vocabulary count by 1
  );

  return vocabulary;
};
//get Single Vocabulary
const getSingleVocabularyFromDB = async (id: string) => {
  const user = await Vocabulary.findById(id);
  if (!user) {
    throw new ApiError(404, 'Vocabulary not found');
  }
  return user;
};
const getAllVocabulariesFromDB = async (filter: object) => {
  return await Vocabulary.find(filter);
};
//Pagination
const getPaginatedVocabulariesFromDB = async (
  lessonNo: string,
  page: number,
  limit: number,
): Promise<TPaginatedResult> => {
  try {
    const vocabularies = await Vocabulary.find({ lessonNo })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalVocabularies = await Vocabulary.countDocuments({ lessonNo });

    return {
      vocabularies,
      totalVocabularies,
      totalPages: Math.ceil(totalVocabularies / limit),
    };
  } catch (error) {
    throw new Error('Error fetching vocabularies: ' + (error as Error).message);
  }
};

const updateVocabularyInDB = async (
  id: string,
  vocabularyData: Partial<TVocabulary>,
) => {
  const oldVocabulary = await Vocabulary.findById(id);
  if (!oldVocabulary) throw new ApiError(409, 'Vocabulary not found');

  const isLessonExist = await Lesson.findOne({
    lessonNumber: vocabularyData.lessonNo,
  });
  if (!isLessonExist) throw new ApiError(409, 'Lesson No not found');

  // If the lesson number is changing, update the vocabulary count of the old and new lessons
  const oldLessonNo = oldVocabulary.lessonNo;
  const newLessonNo = vocabularyData.lessonNo;

  // Decrease the count of the old lesson if the lesson number is changing
  if (oldLessonNo !== newLessonNo) {
    await Lesson.findOneAndUpdate(
      { lessonNumber: oldLessonNo },
      { $inc: { vocabularyCount: -1 } }, // Decrement vocabulary count for old lesson
    );

    // Increase the count of the new lesson
    await Lesson.findOneAndUpdate(
      { lessonNumber: newLessonNo },
      { $inc: { vocabularyCount: 1 } }, // Increment vocabulary count for new lesson
    );
  }

  // Update the vocabulary entry with the new data
  return await Vocabulary.findByIdAndUpdate(
    id,
    { $set: vocabularyData }, // Update only provided fields
    { new: true, runValidators: true },
  );
};

const deleteVocabularyFromDB = async (id: string) => {
  // Find the vocabulary by its ID
  const vocabulary = await Vocabulary.findById(id);
  if (!vocabulary) throw new Error('Vocabulary not found');

  // Update the vocabulary count for the related lesson (decrement)
  await Lesson.findOneAndUpdate(
    { lessonNumber: vocabulary.lessonNo },
    { $inc: { vocabularyCount: -1 } }, // Decrement vocabulary count by 1
  );

  // Delete the vocabulary
  await Vocabulary.findByIdAndDelete(id);

  return vocabulary;
};
export const VocabularyServices = {
  createVocabularyIntoDB,
  getAllVocabulariesFromDB,
  updateVocabularyInDB,
  deleteVocabularyFromDB,
  getSingleVocabularyFromDB,
  getPaginatedVocabulariesFromDB,
};
