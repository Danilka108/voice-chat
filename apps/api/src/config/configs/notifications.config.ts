import { registerAs } from '@nestjs/config'

export const notificationsConfig = registerAs('notifications', () => ({
  apiID: process.env.SMS_API_ID,
  apiURL: process.env.SMS_API_URL,
}))
