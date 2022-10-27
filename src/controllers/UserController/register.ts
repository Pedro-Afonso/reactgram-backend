import { Request, Response } from 'express'

import { generatePasswordHash, generateToken } from '../../utils'
import { UserModel, IUser } from '../../models/UserModel'

interface IRegisterRequest extends Request {
  body: IUser
}

// Register user
export const register = async (
  req: IRegisterRequest,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body

  // Check if user exists
  const user = await UserModel.findOne({ email })

  if (user) {
    res
      .status(422)
      .json({ errors: 'Já existe um usuário cadastrado com esse e-mail.' })
    return
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
    res.status(422).json({
      errors: ['Houve um erro, por favor tente mais tarde.']
    })
    return
  }

  // Return the token
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id)
  })
}
