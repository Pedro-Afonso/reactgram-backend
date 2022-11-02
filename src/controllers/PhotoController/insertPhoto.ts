import { Response } from 'express'
import { PhotoModel } from '../../models/PhotoModel'
import { UserModel } from '../../models/UserModel'

/* interface IInsertPhotoRequest extends Request {
  body: IPhoto
  user: IUser
} */

// Insert a photo, with an user related to it
export const insertPhoto = async (req: any, res: Response) => {
  const { title } = req.body
  const image = req.file.location

  const user = await UserModel.findById(req.user._id)
  // Create photo
  const newPhoto = await PhotoModel.create({
    image,
    title,
    userId: user._id,
    userName: user.name
  })

  // Check if user photo was uploaded sucessfully
  if (!newPhoto) {
    res.status(422).json({
      errors: ['Houve um erro, por favor tente novamente mais tarde.']
    })
    return
  }

  // Return data
  res.status(201).json(newPhoto)
}
