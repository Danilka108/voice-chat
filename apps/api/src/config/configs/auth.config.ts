import { registerAs } from '@nestjs/config'

export const authConfig = registerAs('auth', () => ({
  codeMax: 999999,
  codeTTL: 10 * 60,
  codeDisableRefreshPeriod: 2 * 60,
}))
