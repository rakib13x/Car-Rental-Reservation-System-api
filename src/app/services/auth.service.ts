import { TLoginUser } from '../interface/auth.interface';
import { UserModel } from '../model/user.model';

const loginUser = async (payload: TLoginUser) => {
  console.log(payload);

  const isUserExists = await UserModel.findOne({ email: payload?.email });
  console.log(isUserExists);

  return {};
};

export const AuthServices = {
  loginUser,
};
