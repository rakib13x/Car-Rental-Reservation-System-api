import { TUser } from '../interface/user.interface';
import { UserModel } from '../models/user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
