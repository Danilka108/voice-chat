import { registerAs } from '@nestjs/config'

export const authConfig = registerAs('auth', () => ({
  code: {
    max: 999999,
    ttl: 10 * 60 * 1000, // In Milliseconds
    disableRefreshPeriod: 2 * 60, // In Seconds
  },
  session: {
    ttl: 365 * 24 * 3600 * 1000,
  },
}))
