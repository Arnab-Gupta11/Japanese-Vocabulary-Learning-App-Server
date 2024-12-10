import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const Login = catchAsync(async (req, res) => {
  const { token, user } = await AuthServices.LoginUser(req.body);
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    maxAge: 3600000,
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
  res.clearCookie('token');
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Logout successfully',
    data: '',
  });
});
export const AuthControllers = {
  Login,
  Logout,
};
