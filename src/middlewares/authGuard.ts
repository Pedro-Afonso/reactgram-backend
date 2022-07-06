import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { IUser, UserModel } from "../models/UserModel";

const jwtSecret = process.env.JWT_SECRET;

interface IAuthGuardRequest extends Request {
  user: IUser;
}

const authGuard = async (
  req: IAuthGuardRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Check if header has a token
  if (!token) {
    return res.status(401).json({ errors: ["Acesso negado!"] });
  }

  // Check if token is valid
  try {
    const verified = jwt.verify(token, jwtSecret) as IUser;
    console.log(verified);
    console.log(jwtSecret);
    req.user = await UserModel.findById(verified.id).select("-password");

    next();
  } catch (error) {
    res.status(400).json({ errors: ["O Token é inválido!"] });
  }
};

export { authGuard };
