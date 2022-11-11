import { sign } from 'jsonwebtoken'
import { Types } from 'mongoose'
import 'dotenv/config'

const jwtSecret = process.env.JWT_SECRET

// Generate user token
export const generateToken = (id: Types.ObjectId): string => {
  return sign({ id }, jwtSecret, { expiresIn: '5d' })
}
