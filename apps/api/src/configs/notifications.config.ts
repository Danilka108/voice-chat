import { Provider } from '@nestjs/common'

export interface NotificationsConfig {
  apiSID: string
  apiToken: string
  apiFrom: string
}

export const NOTIFICATIONS_CONFIG = Symbol('Notifications Config')

export const notificationsConfigProvider: Provider<NotificationsConfig> = {
  provide: NOTIFICATIONS_CONFIG,
  useValue: {
    apiSID: <string>process.env.NOTIFICATIONS_API_SID,
    apiToken: <string>process.env.NOTIFICATIONS_API_TOKEN,
    apiFrom: <string>process.env.NOTIFICATIONS_API_FROM,
  },
}
