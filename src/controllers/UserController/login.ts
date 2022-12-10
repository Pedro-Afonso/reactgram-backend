import { Request, Response } from 'express'
// eslint-disable-next-line import/default
import bcrypt from 'bcryptjs'
import 'dotenv/config'

import { UserModel, IUser } from '../../models/UserModel'
import { generateToken, tryCatch } from '../../utils'
import { AppError } from '../../config/AppError'

interface ILoginRequest extends Request {
  body: {
    email: IUser['email']
    password: IUser['password']
  }
}

// Sign user in
export const login = tryCatch(
  async (req: ILoginRequest, res: Response): Promise<void> => {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })

    // Check if user exists
    if (!user) {
      throw new AppError(404, 'Usuário não encontrado!')
    }

    // Check if passwords matches
    if (!(await bcrypt.compare(password, user.password))) {
      throw new AppError(422, 'Senha inválida!')
    }

    // Return user with token
    res.status(200).json({
      authUser: user,
      token: generateToken(user._id),
      message: 'Usuário autenticado com sucesso!'
    })
  }
)
