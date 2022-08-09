import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { generateToken } from "../../utils";
import { UserModel, IUser } from "../../models/UserModel";

interface ILoginRequest extends Request {
  body: {
    email: IUser["email"];
    password: IUser["password"];
  };
}

// Sign user in
export const login = async (
  req: ILoginRequest,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  // Check if user exists
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado"] });
    return;
  }

  // Check if passwords matches
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha inválida"] });
    return;
  }

  // Return user with token
  res.status(200).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};
