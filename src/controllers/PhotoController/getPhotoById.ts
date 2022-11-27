import { Request, Response } from 'express'

import { PhotoModel } from '../../models/PhotoModel'
import { AppError } from '../../config/AppError'
import { tryCatch } from '../../utils'

// Get photo by id
export const getPhotoById = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params

  const photo = await PhotoModel.findById(id)
    .populate('user', 'name profileImage')
    .exec()
  // Check if photo exists
  if (!photo) {
    throw new AppError(404, 'Foto não encontrada!')
  }

  res.status(200).json(photo)
})
