import { Request, Response } from 'express'

import { UserModel } from '../../models/UserModel'
import { AppError } from '../../config/AppError'
import { tryCatch } from '../../utils'

// Get user by id
export const getUserById = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params

  const user = await UserModel.findById(id).select(
    '-password -__v -email -updatedAt'
  )

  // Check if user exists
  if (!user) {
    throw new AppError(404, 'Usuário não encontrado!')
  }

  res.status(200).json(user)
})
