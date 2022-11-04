import { Response } from 'express'
import { conn } from '../../config/db'

import { PhotoModel } from '../../models/PhotoModel'

// Get all photos
export const getAllPhotos = async (_, res: Response) => {
  await conn()

  const photos = await PhotoModel.find({}).sort({ createdAt: 'desc' }).exec()

  return res.status(200).json(photos)
}
