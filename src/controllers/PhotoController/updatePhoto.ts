import { Request, Response } from 'express'

import { PhotoModel } from '../../models/PhotoModel'
import { IUser } from '../../models/UserModel'

interface IUpdatePhotoRequest extends Request {
  user: IUser
}
// Update a photo
export const updatePhoto = async (req: IUpdatePhotoRequest, res: Response) => {
  const { id } = req.params
  const { title } = req.body

  let image = null

  if (req.file) {
    image = req.file.location
  }

  const reqUser = req.user

  const photo = await PhotoModel.findById(id)

  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ['Foto não encontrada.'] })
    return
  }

  // Check if photo belongs to user
  if (!photo.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ['Ocorreu um erro, tente novamente mais tarde'] })
    return
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
