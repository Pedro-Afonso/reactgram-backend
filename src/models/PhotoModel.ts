import mongoose, { Types, Schema } from 'mongoose'
import { IUser } from './UserModel'

interface IComment {
  comment: string
  userName: IUser['name']
  userImage: IUser['profileImage']
  userId: IUser['_id']
}

export interface IPhoto {
  image: string
  title: string
  likes: Array<IUser['_id']>
  comments: IComment[]
  userId: Types.ObjectId
  userName: string
}

const photoSchema = new Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    likes: [{ type: String }],
    comments: [
      {
        comment: { type: String, required: true },
        userName: { type: String, required: true },
        userImage: { type: String },
        userId: { type: String, required: true }
      }
    ],
    userId: { type: Schema.Types.ObjectId },
    userName: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

export const PhotoModel = mongoose.model<IPhoto>('Photo', photoSchema)
