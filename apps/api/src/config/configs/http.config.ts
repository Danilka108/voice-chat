import { registerAs } from '@nestjs/config'

export const httpConfig = registerAs('http', () => ({
  timeout: 5000,
  maxRedirects: 5,
}))
