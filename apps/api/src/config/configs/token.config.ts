import { registerAs } from '@nestjs/config'

export const tokenConfig = registerAs('token', () => ({
  successToken: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: 60 * 60, // In seconds
  },
}))