import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { CacheAuthCodeService } from '../cache/shared/cache-auth-code.service'
import {
  BadRequestException,
  ForbiddenException,
  NotAcceptableException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SessionService } from '../session/session.service'
import { NotificationsService } from '../notifications/notifications.service'
import { UserDBService } from '../user/user-db.service'
import { CacheAuthSessionService } from '../cache/shared/cache-auth-session.service'
import { CacheAuthCode } from '../cache/interfaces/auth-code.interface'

jest.mock('../cache/shared/cache-auth-code.service')
jest.mock('../session/session.service')
jest.mock('../notifications/notifications.service')
jest.mock('../user/user-db.service')
jest.mock('../cache/shared/cache-auth-session.service')

describe('AuthService', () => {
  let authService: AuthService
  let cacheAuthCodeService: CacheAuthCodeService
  let configService: ConfigService
  let sessionService: SessionService
  let notificationsService: NotificationsService
  let userDBService: UserDBService
  let cacheAuthSessionService: CacheAuthSessionService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        CacheAuthCodeService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        SessionService,
        NotificationsService,
        UserDBService,
        CacheAuthSessionService,
      ],
    }).compile()

    authService = module.get(AuthService)
    cacheAuthCodeService = module.get(CacheAuthCodeService)
    configService = module.get(ConfigService)
    sessionService = module.get(SessionService)
    notificationsService = module.get(NotificationsService)
    userDBService = module.get(UserDBService)
    cacheAuthSessionService = module.get(CacheAuthSessionService)
  })

  describe('tel', () => {
    beforeEach(() => {
      jest.spyOn(sessionService, 'createAuthCode').mockReturnValue(0)
      jest.spyOn(cacheAuthCodeService, 'get').mockReturnValue(
        Promise.resolve({
          code: 0,
          createdAt: Date.now(),
        })
      )
    })

    describe('the disable period for sending a new notification has not expired', () => {
      it('should throw an error', async () => {
        jest.spyOn(configService, 'get').mockReturnValue(999999)

        await expect(
          authService.tel({ tel: '', browser: '', os: '' }, '')
        ).rejects.toThrowError(NotAcceptableException)
      })
    })

    describe("it's possible to send the notification", () => {
      let setCodeSpy: jest.SpyInstance<Promise<void>, [data: CacheAuthCode, code: number]>

      beforeEach(() => {
        jest.spyOn(configService, 'get').mockReturnValue(-999999)
        jest
          .spyOn(notificationsService, 'sendAuthNotification')
          .mockReturnValue(Promise.resolve(true))

        setCodeSpy = jest.spyOn(cacheAuthCodeService, 'set')
      })

      it('should add a new auth code to the cache', async () => {
        await authService.tel({ tel: '', browser: '', os: '' }, '')

        expect(setCodeSpy).toHaveBeenCalled()
      })
    })

    describe("it's not possible to send notification", () => {
      let delCodeSpy: jest.SpyInstance<Promise<void>, [data: CacheAuthCode]>

      beforeEach(() => {
        jest.spyOn(configService, 'get').mockReturnValue(-999999)
        jest
          .spyOn(notificationsService, 'sendAuthNotification')
          .mockReturnValue(Promise.resolve(false))

        delCodeSpy = jest.spyOn(cacheAuthCodeService, 'del')
      })

      it('should remove a new auth code from the cache', async () => {
        try {
          await authService.tel({ tel: '', browser: '', os: '' }, '')
        } catch (e) {
          //
        } finally {
          expect(delCodeSpy).toHaveBeenCalled()
        }
      })

      it('should throw an error', async () => {
        await expect(
          authService.tel({ tel: '', browser: '', os: '' }, '')
        ).rejects.toThrowError(BadRequestException)
      })
    })
  })

  describe('code', () => {
    beforeEach(() => {
      jest.spyOn(sessionService, 'createAccessToken').mockReturnValue('')
      jest.spyOn(sessionService, 'createRefreshToken').mockReturnValue('')
    })

    describe('auth code', () => {
      it('should throw an error if the auth code is not in the cache', async () => {
        jest.spyOn(cacheAuthCodeService, 'get').mockReturnValue(Promise.resolve(null))

        await expect(
          authService.code(
            {
              tel: '',
              code: 0,
              browser: '',
              os: '',
            },
            ''
          )
        ).rejects.toThrowError(ForbiddenException)
      })

      it('should throw an error if the auth code is not valid', async () => {
        jest.spyOn(cacheAuthCodeService, 'get').mockReturnValue(
          Promise.resolve({
            code: 999999,
            createdAt: 0,
          })
        )

        await expect(
          authService.code(
            {
              tel: '',
              code: 111111,
              browser: '',
              os: '',
            },
            ''
          )
        ).rejects.toThrowError(ForbiddenException)
      })

      it('should remove auth code from the cache', async () => {
        jest.spyOn(cacheAuthCodeService, 'get').mockReturnValue(
          Promise.resolve({
            code: 999999,
            createdAt: 0,
          })
        )

        jest.spyOn(userDBService, 'findByTel').mockReturnValue(
          Promise.resolve({
            id: 0,
            name: '',
            tel: '',
          })
        )

        const delCodeSpy = jest.spyOn(cacheAuthCodeService, 'del')

        await authService.code(
          {
            tel: '',
            code: 999999,
            browser: '',
            os: '',
          },
          ''
        )

        expect(delCodeSpy).toHaveBeenCalled()
      })
    })

    describe('user', () => {
      it('should create a new user if the user is not found by tel.', async () => {
        jest.spyOn(cacheAuthCodeService, 'get').mockReturnValue(
          Promise.resolve({
            code: 999999,
            createdAt: 0,
          })
        )

        jest.spyOn(userDBService, 'findByTel').mockReturnValue(Promise.resolve(null))

        jest.spyOn(userDBService, 'create').mockReturnValue(
          Promise.resolve({
            id: 0,
            name: '',
            tel: '',
          })
        )

        const createUserSpy = jest.spyOn(userDBService, 'create')

        await authService.code(
          {
            tel: '',
            code: 999999,
            browser: '',
            os: '',
          },
          ''
        )

        expect(createUserSpy).toHaveBeenCalled()
      })
    })

    describe('auth session', () => {
      it('should create a new auth session', async () => {
        jest.spyOn(cacheAuthCodeService, 'get').mockReturnValue(
          Promise.resolve({
            code: 999999,
            createdAt: 0,
          })
        )

        jest.spyOn(userDBService, 'findByTel').mockReturnValue(
          Promise.resolve({
            id: 0,
            name: '',
            tel: '',
          })
        )

        const setSessionSpy = jest.spyOn(cacheAuthSessionService, 'set')

        await authService.code(
          {
            tel: '',
            code: 999999,
            browser: '',
            os: '',
          },
          ''
        )

        expect(setSessionSpy).toHaveBeenCalled()
      })
    })
  })

  describe('refreshToken', () => {
    describe('decoded', () => {
      it('should throw an error if it failed to decode the access token', async () => {
        jest.spyOn(sessionService, 'decodeAccessToken').mockReturnValue(null)

        await expect(
          authService.refreshToken(
            { refreshToken: '', accessToken: '', browser: '', os: '' },
            ''
          )
        ).rejects.toThrowError(ForbiddenException)
      })
    })

    describe('auth session', () => {
      it('should throw an error if the auth session is not in the cache', async () => {
        jest.spyOn(sessionService, 'decodeAccessToken').mockReturnValue({
          userID: 0,
          tel: '',
        })

        jest.spyOn(cacheAuthSessionService, 'get').mockReturnValue(Promise.resolve(null))

        await expect(
          authService.refreshToken(
            { refreshToken: '', accessToken: '', browser: '', os: '' },
            ''
          )
        ).rejects.toThrowError(ForbiddenException)
      })

      it('should throw an error if the auth session is not valid', async () => {
        jest.spyOn(sessionService, 'decodeAccessToken').mockReturnValue({
          userID: 0,
          tel: '',
        })

        jest.spyOn(cacheAuthSessionService, 'get').mockReturnValue(
          Promise.resolve({
            refreshToken: 'abc',
          })
        )

        await expect(
          authService.refreshToken(
            { refreshToken: '', accessToken: '', browser: '', os: '' },
            ''
          )
        ).rejects.toThrowError(ForbiddenException)
      })

      it('should add a new auth session to the cache', async () => {
        jest.spyOn(sessionService, 'decodeAccessToken').mockReturnValue({
          userID: 0,
          tel: '',
        })

        jest.spyOn(cacheAuthSessionService, 'get').mockReturnValue(
          Promise.resolve({
            refreshToken: 'abc',
          })
        )

        const setSessionSpy = jest.spyOn(cacheAuthSessionService, 'set')

        await authService.refreshToken(
          {
            refreshToken: 'abc',
            accessToken: '',
            browser: '',
            os: '',
          },
          ''
        )

        expect(setSessionSpy).toHaveBeenCalled()
      })
    })
  })
})
