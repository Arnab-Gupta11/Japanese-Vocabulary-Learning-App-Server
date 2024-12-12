import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { TVocabulary } from './vocabulary.interface';
import { VocabularyServices } from './vocabulary.service';
import sendResponse from '../../utils/sendResponse';

const createVocabulary = catchAsync(async (req: Request, res: Response) => {
  const result = await VocabularyServices.createVocabularyIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Vocabulary created successfully',
    data: result,
  });
});

const getAllVocabularies = catchAsync(async (req: Request, res: Response) => {
  const { lessonNo } = req.query;
  const filter = lessonNo ? { lessonNo } : {};
  const vocabularies =
    await VocabularyServices.getAllVocabulariesFromDB(filter);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Vocabularies fetched successfully',
    data: vocabularies,
  });
});

const updateVocabulary = catchAsync(async (req: Request, res: Response) => {
  const { word, pronunciation, whenToSay, lessonNo, adminEmail }: TVocabulary =
    req.body;
  const { id } = req.params;
  const updatedVocabulary = await VocabularyServices.updateVocabularyInDB(id, {
    word,
    pronunciation,
    whenToSay,
    lessonNo,
    adminEmail,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Vocabulary updated successfully',
    data: updatedVocabulary,
  });
});

const deleteVocabulary = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await VocabularyServices.deleteVocabularyFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Vocabulary deleted successfully',
    data: '',
  });
});

export const VocabularyController = {
  createVocabulary,
  getAllVocabularies,
  updateVocabulary,
  deleteVocabulary,
};
