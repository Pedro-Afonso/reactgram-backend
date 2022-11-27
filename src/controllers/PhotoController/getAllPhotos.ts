import { Response } from 'express'

import { PhotoModel } from '../../models/PhotoModel'
import { tryCatch } from '../../utils'

// Get all photos
export const getAllPhotos = tryCatch(async (_, res: Response) => {
  const photos = await PhotoModel.find({})
    .sort({ createdAt: 'desc' })
    .limit(10)
    .populate('user', 'name profileImage')
    .exec()

  return res.status(200).json(photos)
})
