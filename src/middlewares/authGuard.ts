import { Request, Response, NextFunction } from 'express'
// eslint-disable-next-line import/default
import jwt, { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config'

import { IUser, UserModel } from '../models/UserModel'
import { AppError } from '../config/AppError'
import { tryCatch } from '../utils'

const jwtSecret = process.env.JWT_SECRET

interface IAuthGuardRequest extends Request {
  user: IUser
}

const authGuard = tryCatch(
  async (
    req: IAuthGuardRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    // Check if header has a token
    if (!token) {
      throw new AppError(401, 'Acesso negado!')
    }

    // Check if token is valid
    try {
      const verified = jwt.verify(token, jwtSecret) as JwtPayload

      req.user = await UserModel.findById(verified.id).select('-password')

      next()
    } catch {
      throw new AppError(400, 'O Token é inválido!')
    }
  }
)

export { authGuard }
