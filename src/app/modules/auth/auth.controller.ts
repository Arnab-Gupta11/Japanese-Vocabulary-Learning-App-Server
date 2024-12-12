/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from '../../errors/ApiError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthenticatedRequest } from './auth.interface';
import { AuthServices } from './auth.service';

const Login = catchAsync(async (req, res) => {
  const { token, user } = await AuthServices.LoginUser(req.body);
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successfully',
    data: {
      ...user.toObject(),
      password: '', // Set the password to an empty string
    },
  });
});
const Logout = catchAsync(async (req, res) => {
  res.clearCookie('token', {
    maxAge: 0,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Logout successfully',
    data: '',
  });
});
const CheckUser = async (req: AuthenticatedRequest, res: any) => {
  const loginUser = req.user;

  if (!loginUser) {
    throw new ApiError(404, 'User not found');
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is retrived successfully',
    data: loginUser,
  });
};
export const AuthControllers = {
  Login,
  Logout,
  CheckUser,
};
