import { registerAs } from '@nestjs/config'

export default registerAs('cache', () => ({
  port: process.env.CACHE_PORT,
  host: process.env.CACHE_HOST,
}))
