import { Request, Response } from 'express'

import { generatePasswordHash, generateToken, tryCatch } from '../../utils'
import { UserModel, IUser } from '../../models/UserModel'
import { AppError } from '../../config/AppError'

interface IRegisterRequest extends Request {
  body: IUser
}

// Register user
export const register = tryCatch(
  async (req: IRegisterRequest, res: Response): Promise<void> => {
    const { name, email, password } = req.body

    // Check if user exists
    const user = await UserModel.findOne({ email })

    if (user) {
      throw new AppError(
        422,
        'Já existe um usuário cadastrado com esse e-mail.'
      )
    }

    // Generate password hash
    const passwordHash = await generatePasswordHash(password)

    // Create user
    const newUser = await UserModel.create({
      name,
      email,
      password: passwordHash
    })

    // Check if user was created sucessfully
    if (!newUser) {
      throw new AppError(422)
    }

    // Return the token
    res.status(201).json({
      _id: newUser._id,
      token: generateToken(newUser._id)
    })
  }
)
