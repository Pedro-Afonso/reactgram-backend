import { Request, Response } from 'express'
import { CommentModel } from '../../models/CommentModel'

import { PhotoModel } from '../../models/PhotoModel'
import { IUser, UserModel } from '../../models/UserModel'

interface ICommentPhotoRequest extends Request {
  user: IUser
}
// Comment functionality
export const insertComment = async (
  req: ICommentPhotoRequest,
  res: Response
) => {
  const { comment: text, photoId } = req.body

  const user = await UserModel.findById(req.user._id)

  const photo = await PhotoModel.findById(photoId)

  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ['Foto não encontrada!'] })
    return
  }

  const populateOptions = { path: 'user', select: 'name profileImage' }

  // Create comment
  const comment = await CommentModel.create({
    text,
    user: user._id,
    photo: photo._id
  })

  // Check if comment was created sucessfully
  if (!comment) {
    res.status(422).json({
      errors: ['Houve um erro, por favor tente mais tarde.']
    })
    return
  }

  await comment.populate(populateOptions)

  // Put comment in the array of comments
  await photo.updateOne({ $push: { comments: comment._id } })

  res.status(200).json({
    comment,
    message: 'Comentário adicionado com sucesso!'
  })
}
