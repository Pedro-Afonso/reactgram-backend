import { Request, Response } from 'express'

import { PhotoModel } from '../../models/PhotoModel'
import { AppError } from '../../config/AppError'
import { IUser } from '../../models/UserModel'
import { tryCatch } from '../../utils'

interface IUpdatePhotoRequest extends Request {
  user: IUser
}
// Update a photo
export const updatePhoto = tryCatch(
  async (req: IUpdatePhotoRequest, res: Response) => {
    const { id } = req.params
    const { title } = req.body

    let image = null

    if (req.file) {
      image = req.file.location
    }

    const reqUser = req.user

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

    const photo = await PhotoModel.findById(id).populate(populateOptions)

    // Check if photo exists
    if (!photo) {
      throw new AppError(404, 'Foto não encontrada.')
    }

    // Check if photo belongs to user
    if (!photo.user.equals(reqUser._id)) {
      throw new AppError(422)
    }

    if (title) {
      photo.title = title
    }

    if (image) {
      photo.image = image
    }

    await photo.save()

    res.status(200).json({ photo, message: 'Foto atualizada com sucesso!' })
  }
)
