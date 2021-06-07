import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { NotificationsService } from './notifications.service'

describe('NotificationsService', () => {
  let configService: ConfigService
  let notificationsService: NotificationsService

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: 'twilio',
          useValue: {
            messages: {
              create() {
                return {
                  errorCode: 400,
                }
              },
            },
          },
        },
        NotificationsService,
      ],
    }).compile()

    configService = testingModule.get(ConfigService)
    notificationsService = testingModule.get(NotificationsService)
  })

  describe('sendAuthNotification', () => {
    it('should return false if no notification is sent', async () => {
      jest.spyOn(configService, 'get').mockReturnValue('')

      await expect(notificationsService.sendAuthNotification('', 0)).resolves.toBe(false)
    })
  })
})
