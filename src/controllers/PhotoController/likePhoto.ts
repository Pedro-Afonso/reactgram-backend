import { Request, Response } from 'express'

import { PhotoModel } from '../../models/PhotoModel'
import { IUser } from '../../models/UserModel'

interface ILikePhotoRequest extends Request {
  user: IUser
}
// Like functionallity
export const likePhoto = async (req: ILikePhotoRequest, res: Response) => {
  const { id } = req.params

  const reqUser = req.user

  const photo = await PhotoModel.findById(id)

  // Check if photo exists
  if (!photo) {
    res.status(400).json({ errors: ['Foto não encontrada!'] })
    return
  }

  // Check if user already liked the photo
  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ['Você já curtiu esta foto'] })
    return
  }

  // Put user id in array of likes
  await photo.updateOne({ $push: { likes: reqUser._id } })

  res
    .status(200)
    .json({ photoId: id, userId: reqUser._id, message: 'A foto foi curtida!' })
}
