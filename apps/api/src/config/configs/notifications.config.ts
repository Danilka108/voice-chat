import { registerAs } from '@nestjs/config'

export const notificationsConfig = registerAs('notifications', () => ({
  apiSID: process.env.NOTIFICATIONS_API_SID,
  apiToken: process.env.NOTIFICATIONS_API_TOKEN,
  apiFrom: process.env.NOTIFICATIONS_API_FROM,
}))
