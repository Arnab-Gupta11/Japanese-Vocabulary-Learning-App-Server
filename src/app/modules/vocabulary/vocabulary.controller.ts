import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
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

const getSingleVocabulary = catchAsync(async (req, res) => {
  const { id } = req.params;
  const vocabulary = await VocabularyServices.getSingleVocabularyFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Vocabulary retrived successfully',
    data: vocabulary,
  });
});
//Pagination vocabullary
const getPaginatedVocabularies = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { lessonNo } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 1;

    const result = await VocabularyServices.getPaginatedVocabulariesFromDB(
      lessonNo,
      page,
      limit,
    );

    res.status(200).json({
      success: true,
      data: result.vocabularies,
      total: result.totalVocabularies,
      currentPage: page,
      totalPages: result.totalPages,
    });
  },
);

const updateVocabulary = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedVocabulary = await VocabularyServices.updateVocabularyInDB(
    id,
    req.body,
  );
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
  getSingleVocabulary,
  getPaginatedVocabularies,
};
