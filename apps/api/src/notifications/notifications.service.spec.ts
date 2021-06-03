import { HttpService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { of } from 'rxjs'
import { NotificationsService } from './notifications.service'

describe('NotificationsService', () => {
  let configService: ConfigService
  let httpService: HttpService
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
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        NotificationsService,
      ],
    }).compile()

    configService = testingModule.get(ConfigService)
    httpService = testingModule.get(HttpService)
    notificationsService = testingModule.get(NotificationsService)
  })

  describe('sendAuthNotification', () => {
    it('should return false if the status of the HTTP request is not 200', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          status: 201,
          data: {},
          statusText: '',
          headers: {},
          config: {},
        })
      )

      jest.spyOn(configService, 'get').mockReturnValue('')

      await expect(notificationsService.sendAuthNotification('', 0)).resolves.toBe(false)
    })
  })
})
