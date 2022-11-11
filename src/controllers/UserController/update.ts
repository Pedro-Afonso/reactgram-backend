import { Request, Response } from 'express'
import 'dotenv/config'

import { generatePasswordHash } from '../../utils'
import { UserModel, IUser } from '../../models/UserModel'

interface IUpdateForm {
  name?: string
  bio?: string
  profileImage?: string
  password?: string
}

interface IUpdateRequest extends Request {
  body: {
    name: IUser['name']
    password: IUser['password']
    bio: IUser['bio']
  }
  user: IUser
}
// Update user
export const update = async (req: IUpdateRequest, res: Response) => {
  const { name, password, bio } = req.body

  const reqUser = req.user

  const update = {} as IUpdateForm

  if (name) {
    update.name = name
  }

  if (bio) {
    update.bio = bio
  }

  if (req.file) {
    update.profileImage = req.file.location
  }

  if (password) {
    update.password = await generatePasswordHash(password)
  }

  const user = await UserModel.findOneAndUpdate({ _id: reqUser._id }, update, {
    new: true
  }).select('-password')

  res.status(200).json(user)
}
