import mongoose, { Types, Schema } from 'mongoose'

interface IComment {
  _id?: Types.ObjectId
  text?: string
  user?: Types.ObjectId
  photo?: Types.ObjectId
  createdAt?: Date
  updatedAt?: Date
  __v?: number
}

const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    photo: { type: Schema.Types.ObjectId, ref: 'Photo' }
  },
  {
    timestamps: true
  }
)

export const CommentModel = mongoose.model<IComment>('Comment', commentSchema)
