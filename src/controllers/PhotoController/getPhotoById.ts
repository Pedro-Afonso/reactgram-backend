import { Request, Response } from 'express'

import { PhotoModel } from '../../models/PhotoModel'

// Get photo by id
export const getPhotoById = async (req: Request, res: Response) => {
  const { id } = req.params

  const photo = await PhotoModel.findById(id)
    .populate('user', 'name profileImage')
    .exec()
  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ['Foto não encontrada!'] })
    return
  }

  res.status(200).json(photo)
}
