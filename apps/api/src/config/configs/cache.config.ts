import { registerAs } from '@nestjs/config'

export const cacheConfig = registerAs('cache', () => ({
  port: process.env.CACHE_PORT,
  host: process.env.CACHE_HOST,
}))
