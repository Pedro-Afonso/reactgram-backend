import { Request, Response } from 'express'

import { CommentModel } from '../../models/CommentModel'
import { IUser, UserModel } from '../../models/UserModel'
import { PhotoModel } from '../../models/PhotoModel'
import { AppError } from '../../config/AppError'
import { tryCatch } from '../../utils'

interface ICommentPhotoRequest extends Request {
  user: IUser
}
// Comment functionality
export const deleteComment = tryCatch(
  async (req: ICommentPhotoRequest, res: Response) => {
    const { id: commentId } = req.params

    const user = await UserModel.findById(req.user._id)

    const comment = await CommentModel.findById(commentId)

    // Check if the comment exists and belongs to the user
    if (!comment || !comment.user.equals(user._id)) {
      throw new AppError(422)
    }

    const photo = await PhotoModel.findById(comment.photo)

    // Check if photo exists
    if (!photo) {
      throw new AppError(404, 'Foto não encontrada!')
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
)
