export interface INotificationsService {
  sendAuthNotification(to: string, code: number): Promise<boolean>
}
