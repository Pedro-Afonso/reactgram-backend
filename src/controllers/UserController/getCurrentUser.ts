import { Request, Response } from "express";

import { IUser } from "../../models/UserModel";

interface IGetCurrentUserRequest extends Request {
  user: IUser;
}

// Get current user
export const getCurrentUser = async (
  req: IGetCurrentUserRequest,
  res: Response
): Promise<void> => {
  const user = req.user;

  res.status(200).json(user);
};
