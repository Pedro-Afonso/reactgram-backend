import { Request, Response } from 'express'

import { PhotoModel } from '../../models/PhotoModel'
import { IUser, UserModel } from '../../models/UserModel'

interface ICommentPhotoRequest extends Request {
  user: IUser
}
// Comment functionality
export const commentPhoto = async (
  req: ICommentPhotoRequest,
  res: Response
) => {
  const { id } = req.params
  const { comment } = req.body

  const reqUser = req.user

  const user = await UserModel.findById(reqUser._id)

  const photo = await PhotoModel.findById(id)

  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ['Foto não encontrada!'] })
    return
  }

  // Put comment in the array of comments
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id
  }

  photo.comments.push(userComment)

  await photo.save()

  res.status(200).json({
    comment: userComment,
    message: 'Comentário adicionado com sucesso!'
  })
}
