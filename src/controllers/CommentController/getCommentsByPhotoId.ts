import { Request, Response } from 'express'
import { CommentModel } from '../../models/CommentModel'
import { IUser } from '../../models/UserModel'

interface ICommentPhotoRequest extends Request {
  user: IUser
}
// get Comment functionality
export const getCommentsByPhotoId = async (
  req: ICommentPhotoRequest,
  res: Response
) => {
  const { id } = req.params

  const populateOptions = { path: 'user', select: 'name profileImage' }

  const comments = await CommentModel.find({ photo: { $in: id } })
    .populate(populateOptions)
    .exec()

  // Check if the comment exists
  if (!comments) {
    res
      .status(422)
      .json({ errors: ['Ocorreu um erro, tente novamente mais tarde!'] })
    return
  }

  res.status(200).json({
    comments
  })
}
