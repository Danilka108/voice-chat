import { NotificationsConfig, NOTIFICATIONS_CONFIG } from '../../configs'
import { Provider } from '@nestjs/common'
import * as twilio from 'twilio'

export const TWILIO = 'TWILIO'

export const twilioProvider: Provider = {
  provide: TWILIO,
  useFactory: (config: NotificationsConfig) => {
    const sid = config.apiSID
    const token = config.apiToken
    return twilio(sid, token)
  },
  inject: [NOTIFICATIONS_CONFIG],
}
