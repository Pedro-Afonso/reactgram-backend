import { Request, Response } from 'express'

import { PhotoModel } from '../../models/PhotoModel'

// Get user photos
export const getUserPhotos = async (req: Request, res: Response) => {
  const { id } = req.params

  const populateOptions = [
    {
      path: 'user',
      select: 'name profileImage'
    },
    {
      path: 'comments',
      select: 'text user createdAt',
      populate: { path: 'user', select: 'name profileImage' }
    }
  ]

  const photos = await PhotoModel.find({ user: id })
    .populate(populateOptions)
    .sort({ createdAt: 'desc' })
    .exec()

  return res.status(200).json(photos)
}
