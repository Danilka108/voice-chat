import { Logger } from '@nestjs/common'
import { INotificationsService } from '../interfaces'

export class NotificationsDevService implements INotificationsService {
  async sendAuthNotification(to: string, code: number): Promise<boolean> {
    Logger.log(`Notification sent to: ${to}, code: ${code}`)
    return true
  }
}
