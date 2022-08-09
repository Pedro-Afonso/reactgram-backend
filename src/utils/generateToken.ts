import jwt from "jsonwebtoken";
import "dotenv/config";

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
export const generateToken = (id: number): string => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "5d" });
};
