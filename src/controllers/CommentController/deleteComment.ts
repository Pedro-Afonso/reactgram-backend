import { Request, Response } from 'express'
import { CommentModel } from '../../models/CommentModel'

import { PhotoModel } from '../../models/PhotoModel'
import { IUser, UserModel } from '../../models/UserModel'

interface ICommentPhotoRequest extends Request {
  user: IUser
}
// Comment functionality
export const deleteComment = async (
  req: ICommentPhotoRequest,
  res: Response
) => {
  const { id: commentId } = req.params

  const user = await UserModel.findById(req.user._id)

  const comment = await CommentModel.findById(commentId)

  // Check if the comment exists and belongs to the user
  if (!comment || !comment.user.equals(user._id)) {
    res
      .status(422)
      .json({ errors: ['Ocorreu um erro, tente novamente mais tarde!'] })
    return
  }

  const photo = await PhotoModel.findById(comment.photo)

  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ['Foto não encontrada!'] })
    return
  }

  // Remove comment in the array of comments
  await photo.updateOne({ $pull: { comments: comment._id } })

  // Delete comment
  await comment.delete()

  res.status(200).json({
    id: comment._id,
    message: 'Comentário excluído com sucesso!'
  })
}
