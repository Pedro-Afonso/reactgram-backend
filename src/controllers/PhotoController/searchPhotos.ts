import { Request, Response } from 'express'

import { PhotoModel } from '../../models/PhotoModel'
import { tryCatch } from '../../utils'

// Search a photo by title
export const searchPhotos = tryCatch(async (req: Request, res: Response) => {
  const { q } = req.query

  const photos = await PhotoModel.find({
    title: { $regex: q, $options: 'i' }
  })
    .populate('user', 'name profileImage')
    .exec()

  res.status(200).json(photos)
})
