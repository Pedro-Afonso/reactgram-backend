import { Request, Response, NextFunction } from 'express'
import { AppError } from '../config/AppError'

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // eslint-disable-next-line no-console
  console.log(error)

  if (error instanceof AppError) {
    const errorMessage =
      error.message || 'Houve um erro, por favor tente mais tarde.'

    return res.status(error.statusCode).json({
      errors: [errorMessage]
    })
  }

  return res
    .status(500)
    .json({ errors: ['Houve um erro, por favor tente mais tarde.'] })
}

export { errorHandler }
