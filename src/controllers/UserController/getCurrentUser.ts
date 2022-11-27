import { Request, Response } from 'express'

import { IUser } from '../../models/UserModel'
import { tryCatch } from '../../utils'

interface IGetCurrentUserRequest extends Request {
  user: IUser
}

// Get current user
export const getCurrentUser = tryCatch(
  async (req: IGetCurrentUserRequest, res: Response): Promise<void> => {
    const user = req.user

    res.status(200).json(user)
  }
)
