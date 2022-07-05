import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User";

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (id: number) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "5d" });
};

// Register user and sign in
const register = async (req: Request, res: Response) => {
  res.send("User registration success!");
};

export { register };
