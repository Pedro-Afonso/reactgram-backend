import { Response, Request, NextFunction } from 'express'

export const tryCatch =
  (controller: any) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await controller(req, res, next)
    } catch (error) {
      return next(error)
    }
  }
