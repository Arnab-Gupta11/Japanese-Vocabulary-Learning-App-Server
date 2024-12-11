import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is created succesfully',
    data: result,
  });
});
//Get all user
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users are retrieved succesfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  // const { lessonName, lessonNumber }: TLesson = req.body;
  const { id } = req.params;
  const updatedUser = await UserServices.updateUserIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
});
export const userControllers = {
  createUser,
  getAllUser,
  updateUser,
};
