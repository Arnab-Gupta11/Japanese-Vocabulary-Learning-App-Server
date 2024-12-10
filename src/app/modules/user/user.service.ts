import bcryptjs from 'bcryptjs';
import ApiError from '../../errors/ApiError';
import { User } from './user.model';
import { TUser } from './user.interface';

const createUserIntoDB = async (data: TUser) => {
  const { name, email, password } = data;

  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new ApiError(401, 'User already Exist');
  }
  const hasepassword = await bcryptjs.hashSync(password, 10);
  const newUser = new User({
    name,
    email,
    password: hasepassword,
  });

  const result = await newUser.save();
  return result;
};

export const userServices = {
  createUserIntoDB,
};
