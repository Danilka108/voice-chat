import { registerAs } from '@nestjs/config'

export const authConfig = registerAs('auth', () => ({
  code: {
    max: 999999,
    ttl: 10 * 60, // Seconds
    disableRefreshPeriod: 2 * 60, // Seconds
  },
  session: {
    ttl: 365 * 24 * 3600,
  },
}))
