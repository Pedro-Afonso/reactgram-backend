import mongoose, { Types, Schema } from 'mongoose'

export interface IPhoto {
  _id?: string
  image?: string
  title?: string
  likes?: Array<Types.ObjectId>
  comments?: Array<Types.ObjectId>
  user?: Types.ObjectId
  createdAt?: Date
  updatedAt?: Date
  __v?: number
}

const photoSchema = new Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

export const PhotoModel = mongoose.model<IPhoto>('Photo', photoSchema)
