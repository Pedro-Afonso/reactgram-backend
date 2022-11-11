import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { PhotoModel } from '../../models/PhotoModel'
import { IUser } from '../../models/UserModel'

interface IDeletePhotoRequest extends Request {
  user: IUser
}
export const deletePhoto = async (req: IDeletePhotoRequest, res: Response) => {
  const { id } = req.params

  const reqUser = req.user

  const photo = await PhotoModel.findById(new mongoose.Types.ObjectId(id))

  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ['Foto não encontrada!'] })
    return
  }

  // Check if photo belongs to user
  if (!photo.user.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ['Ocorreu um erro, tente novamente mais tarde!'] })
    return
  }

  await PhotoModel.findByIdAndDelete(photo._id)

  res.status(200).json({ id: photo._id, message: 'Foto excluída com sucesso.' })
}
