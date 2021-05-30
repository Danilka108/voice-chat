import { registerAs } from '@nestjs/config'

export default registerAs('notifications', () => ({
  apiID: process.env.SMS_API_ID,
  apiURL: process.env.SMS_API_URL,
}))
