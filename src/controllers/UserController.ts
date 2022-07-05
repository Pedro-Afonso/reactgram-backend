import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel, IUser } from "../models/UserModel";

const jwtSecret = process.env.JWT_SECRET || "asdasdasdasd";

// Generate user token
const generateToken = (id: number) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "5d" });
};

interface IRegisterRequest extends Request {
  body: IUser;
}

// Register user
const register = async (req: IRegisterRequest, res: Response) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const user = await UserModel.findOne({ email });

  if (user) {
    res
      .status(422)
      .json({ errors: "Já existe um usuário cadastrado com esse e-mail." });
    return;
  }

  // Generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await UserModel.create({
    name,
    email,
    password: passwordHash,
  });

  // Check if user was created sucessfully
  if (!newUser) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente mais tarde."],
    });
    return;
  }

  // Return the token
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

export { register };
