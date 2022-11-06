import mongoose, { Types, Schema } from 'mongoose'

interface ICommentSchema {
  _id?: string
  comment: string
  user: Types.ObjectId
  __v?: number
}

const commentSchema = new Schema({
  comment: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

export const CommentModel = mongoose.model<ICommentSchema>(
  'Comment',
  commentSchema
)
