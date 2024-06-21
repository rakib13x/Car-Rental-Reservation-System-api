import { TUser } from '../interface/user.interface';
import { User } from '../model/user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

const getAllUserFromDb = async () => {
  const result = await User.find({});
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDb,
};
