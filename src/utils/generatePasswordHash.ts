import bcrypt from 'bcryptjs'

// Generate password hash
export const generatePasswordHash = async (password: string) => {
  const salt = await bcrypt.genSalt()
  return bcrypt.hash(password, salt)
}
