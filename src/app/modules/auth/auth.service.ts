import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ApiError from '../../errors/ApiError';
import { User } from '../user/user.model';
import { config } from '../../config';
import { TUser } from '../user/user.interface';

const LoginUser = async (data: Partial<TUser>) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    throw new ApiError(404, 'Invalid credentials');
  }

  const ispassaowrdValid = await bcryptjs.compare(
    password as string,
    user.password,
  );
  if (!ispassaowrdValid) {
    throw new ApiError(404, 'Password is Wrong!');
  }
  const token = jwt.sign({ userId: user._id }, config.jwt_secret as string);
  return { token, user };
};
export const AuthServices = {
  LoginUser,
};