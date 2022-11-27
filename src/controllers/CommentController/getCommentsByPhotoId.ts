import { Request, Response } from 'express'
import { CommentModel } from '../../models/CommentModel'
import { IUser } from '../../models/UserModel'
import { AppError } from '../../config/AppError'
import { tryCatch } from '../../utils'

interface ICommentPhotoRequest extends Request {
  user: IUser
}
// get Comment functionality
export const getCommentsByPhotoId = tryCatch(
  async (req: ICommentPhotoRequest, res: Response) => {
    const { id } = req.params

    const populateOptions = { path: 'user', select: 'name profileImage' }

    const comments = await CommentModel.find({ photo: { $in: id } })
      .populate(populateOptions)
      .exec()

    // Check if the comment exists
    if (!comments) {
      throw new AppError(422)
    }

    res.status(200).json({
      comments
    })
  }
)
