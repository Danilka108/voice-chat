import { registerAs } from '@nestjs/config'

export default registerAs('auth', () => ({
  codeMax: 999999,
  codeTTL: 10 * 60,
  codeDisableRefreshPeriod: 2 * 60,
}))
