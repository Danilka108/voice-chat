import { registerAs } from '@nestjs/config'

export default registerAs('http', () => ({
  timeout: 5000,
  maxRedirects: 5,
}))
