import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { UserModel, IUser } from "../models/UserModel";

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (id: number): string => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "5d" });
};

interface IRegisterRequest extends Request {
  body: IUser;
}

// Register user
const register = async (
  req: IRegisterRequest,
  res: Response
): Promise<void> => {
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

interface IGetCurrentUserRequest extends Request {
  user: IUser;
}

// Get current user
const getCurrentUser = async (
  req: IGetCurrentUserRequest,
  res: Response
): Promise<void> => {
  const user = await req.user;

  res.status(200).json(user);
};

interface ILoginRequest extends Request {
  body: {
    email: IUser["email"];
    password: IUser["password"];
  };
}

// Sign user in
const login = async (req: ILoginRequest, res: Response): Promise<void> => {
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

interface IUpdateRequest extends Request {
  body: {
    name: IUser["name"];
    password: IUser["password"];
    bio: IUser["bio"];
  };
  user: IUser;
}
// Update user
const update = async (req: IUpdateRequest, res: Response) => {
  const { name, password, bio } = req.body;

  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;

  const user = await UserModel.findById(reqUser._id).select("-password");

  if (name) {
    user.name = name;
  }
  if (password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash;
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    user.bio = bio;
  }

  await user.save();

  res.status(200).json(user);
};

// Get user by id
const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await UserModel.findById(new mongoose.Types.ObjectId(id)).select(
    "-password"
  );

  // Check if user exists
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  res.status(200).json(user);
};

export { register, getCurrentUser, login, update, getUserById };
