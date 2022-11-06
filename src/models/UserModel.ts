import mongoose, { Schema } from 'mongoose'

export interface IUser {
  _id?: string
  name: string
  email: string
  password: string
  profileImage: string
  bio: string
  createdAt?: Date
  updatedAt?: Date
  __v?: number
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    bio: { type: String }
  },
  {
    timestamps: true
  }
)

export const UserModel = mongoose.model<IUser>('User', userSchema)
