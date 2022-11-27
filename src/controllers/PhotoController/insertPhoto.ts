import { Response } from 'express'

import { PhotoModel } from '../../models/PhotoModel'
import { UserModel } from '../../models/UserModel'
import { AppError } from '../../config/AppError'
import { tryCatch } from '../../utils'

/* interface IInsertPhotoRequest extends Request {
  body: IPhoto
  user: IUser
} */

// Insert a photo, with an user related to it
export const insertPhoto = tryCatch(async (req: any, res: Response) => {
  const { title } = req.body
  const image = req.file.location

  const user = await UserModel.findById(req.user._id)

  // Create photo
  const newPhoto = await PhotoModel.create({
    image,
    title,
    user: user._id
  })

  // Check if user photo was uploaded sucessfully
  if (!newPhoto) {
    throw new AppError(422)
  }

  // Return data
  res.status(201).json(newPhoto)
})
