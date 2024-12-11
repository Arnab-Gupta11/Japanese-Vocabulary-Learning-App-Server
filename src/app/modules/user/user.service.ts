import bcryptjs from 'bcryptjs';
import ApiError from '../../errors/ApiError';
import { User } from './user.model';
import { TUser } from './user.interface';

//Create user into Databse
const createUserIntoDB = async (data: TUser) => {
  const { name, email, password, image } = data;

  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new ApiError(401, 'User already Exist');
  }
  const hasepassword = await bcryptjs.hashSync(password, 10);
  const newUser = new User({
    name,
    email,
    password: hasepassword,
    image,
  });

  const result = await newUser.save();
  return result;
};

//Get all Users from DB
const getAllUserFromDB = async () => {
  const result = await User.find({}, { password: 0 });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
};
