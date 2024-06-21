import { NextFunction, Request, Response } from 'express';

import { TUserRole } from '../interface/user.interface';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    next();
  });
};

export default auth;
