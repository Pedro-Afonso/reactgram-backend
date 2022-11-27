import { Request, Response } from 'express'
import mongoose from 'mongoose'

import { PhotoModel } from '../../models/PhotoModel'
import { AppError } from '../../config/AppError'
import { IUser } from '../../models/UserModel'
import { tryCatch } from '../../utils'

interface IDeletePhotoRequest extends Request {
  user: IUser
}
export const deletePhoto = tryCatch(
  async (req: IDeletePhotoRequest, res: Response) => {
    const { id } = req.params

    const reqUser = req.user

    const photo = await PhotoModel.findById(new mongoose.Types.ObjectId(id))

    // Check if photo exists
    if (!photo) {
      throw new AppError(404, 'Foto não encontrda!')
    }

    // Check if photo belongs to user
    if (!photo.user.equals(reqUser._id)) {
      throw new AppError(422)
    }

    await PhotoModel.findByIdAndDelete(photo._id)

    res
      .status(200)
      .json({ id: photo._id, message: 'Foto excluída com sucesso.' })
  }
)
