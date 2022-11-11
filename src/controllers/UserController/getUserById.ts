import { Request, Response } from 'express'

import { UserModel } from '../../models/UserModel'

// Get user by id
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params

  const user = await UserModel.findById(id).select(
    '-password -__v -email -updatedAt'
  )

  // Check if user exists
  if (!user) {
    res.status(404).json({ errors: ['Usuário não encontrado!'] })
  }

  res.status(200).json(user)
}
