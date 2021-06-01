import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { CacheAuthCodeService } from '../cache/shared/cache-auth-code.service'
import { BadRequestException, NotAcceptableException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SessionService } from '../session/session.service'
import { NotificationsService } from '../notifications/notifications.service'
import { UserDBService } from '../user/user-db.service'
import { CacheAuthSessionService } from '../cache/shared/cache-auth-session.service'

describe('AuthService', () => {
  let authService: AuthService
  let cacheAuthCodeService: CacheAuthCodeService
  let configService: ConfigService
  let sessionService: SessionService
  let notificationsService: NotificationsService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: CacheAuthCodeService,
          useValue: {
            get: jest.fn(),
            set() {
              return
            },
            del() {
              return
            },
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: SessionService,
          useValue: {
            createAuthCode: jest.fn(),
            createAccessToken: jest.fn(),
            createRefreshToken: jest.fn(),
            decodeAccessToken: jest.fn(),
            verifyAccessToken: jest.fn(),
          },
        },
        {
          provide: NotificationsService,
          useValue: {
            sendAuthNotification: jest.fn(),
          },
        },
        {
          provide: UserDBService,
          useValue: {
            findByTel: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: CacheAuthSessionService,
          useValue: {
            set: jest.fn(),
            get() {
              return
            },
            del() {
              return
            },
          },
        },
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    cacheAuthCodeService = module.get<CacheAuthCodeService>(
      CacheAuthCodeService
    )
    configService = module.get<ConfigService>(ConfigService)
    sessionService = module.get<SessionService>(SessionService)
    notificationsService = module.get<NotificationsService>(
      NotificationsService
    )
  })

  describe('tel', () => {
    beforeEach(() => {
      sessionService.createAuthCode = jest.fn().mockReturnValue(0)

      cacheAuthCodeService.get = jest.fn().mockReturnValue({
        code: 0,
        createdAt: Date.now(),
      })
    })

    it('should throw an error if the disable period for sending a new code has not expired', async () => {
      configService.get = jest.fn().mockReturnValue(999999)

      await expect(
        authService.tel({ tel: '', browser: '', os: '' }, '')
      ).rejects.toThrowError(NotAcceptableException)
    })

    it("should add a new auth code to the cache if it's possible to send this code", async () => {
      configService.get = jest.fn().mockReturnValue(-999999)

      notificationsService.sendAuthNotification = jest
        .fn()
        .mockReturnValue(Promise.resolve(true))

      await expect(
        authService.tel({ tel: '', browser: '', os: '' }, '')
      ).resolves.toBe(undefined)
    })

    it("should remove a new auth code from cache if it's not possible to send notification", async () => {
      configService.get = jest.fn().mockReturnValue(-999999)

      notificationsService.sendAuthNotification = jest
        .fn()
        .mockReturnValue(Promise.resolve(false))

      await expect(
        authService.tel({ tel: '', browser: '', os: '' }, '')
      ).rejects.toThrowError(BadRequestException)
    })
  })
})
