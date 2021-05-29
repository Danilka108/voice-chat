import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  port: process.env.API_PORT,
}))
