import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is retrieved succesfully',
    data: result,
  });
});
export const userControllers = {
  createUser,
};
