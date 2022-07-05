import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];

  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export { validate };
