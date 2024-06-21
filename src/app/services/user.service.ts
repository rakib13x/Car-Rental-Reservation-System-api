import { TUser } from '../interface/user.interface';
import { User } from '../model/user.model';

const createUserIntoDB = async (user: TUser) => {
  user.role = 'user';
  const result = await User.create(user);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
