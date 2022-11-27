import { Request, Response } from 'express'

import { IUser, UserModel } from '../../models/UserModel'
import { CommentModel } from '../../models/CommentModel'
import { PhotoModel } from '../../models/PhotoModel'
import { AppError } from '../../config/AppError'
import { tryCatch } from '../../utils'
interface ICommentPhotoRequest extends Request {
  user: IUser
}
// Comment functionality
export const insertComment = tryCatch(
  async (req: ICommentPhotoRequest, res: Response) => {
    const { comment: text, photoId } = req.body

    const user = await UserModel.findById(req.user._id)

    const photo = await PhotoModel.findById(photoId)

    // Check if photo exists
    if (!photo) {
      throw new AppError(404, 'Foto não encontrda!')
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
      throw new AppError(422)
    }

    await comment.populate(populateOptions)

    // Put comment in the array of comments
    await photo.updateOne({ $push: { comments: comment._id } })

    res.status(200).json({
      comment,
      message: 'Comentário adicionado com sucesso!'
    })
  }
)
