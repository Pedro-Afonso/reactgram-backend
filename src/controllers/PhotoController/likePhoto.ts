import { Request, Response } from 'express'

import { PhotoModel } from '../../models/PhotoModel'
import { IUser } from '../../models/UserModel'
import { AppError } from '../../config/AppError'
import { tryCatch } from '../../utils'

interface ILikePhotoRequest extends Request {
  user: IUser
}
// Like functionallity
export const likePhoto = tryCatch(
  async (req: ILikePhotoRequest, res: Response) => {
    const { id } = req.params

    const reqUser = req.user

    const photo = await PhotoModel.findById(id)

    // Check if photo exists
    if (!photo) {
      throw new AppError(404, 'Foto não encontrada!')
    }

    // Check if user already liked the photo
    if (photo.likes.includes(reqUser._id)) {
      throw new AppError(422, 'Você já curtiu esta foto!')
    }

    // Put user id in array of likes
    await photo.updateOne({ $push: { likes: reqUser._id } })

    res.status(200).json({
      photoId: id,
      userId: reqUser._id,
      message: 'A foto foi curtida!'
    })
  }
)
