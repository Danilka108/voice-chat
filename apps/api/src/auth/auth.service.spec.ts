import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { NotificationsService } from '../notifications/notifications.service'
import { UserDBService } from '../user/user-db.service'
import { CodeService } from '../code/shared/code.service'
import { SessionService } from '../session/shared/session.service'
import { BadRequestException, NotAcceptableException } from '@nestjs/common'

jest.mock('../session/shared/session.service')
jest.mock('../code/shared/code.service')
jest.mock('../notifications/notifications.service')
jest.mock('../user/user-db.service')

describe('AuthService', () => {
  let authService: AuthService
  let sessionService: SessionService
  let codeService: CodeService
  let notificationsService: NotificationsService
  let userDBService: UserDBService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        CodeService,
        SessionService,
        NotificationsService,
        UserDBService,
      ],
    }).compile()

    authService = module.get(AuthService)
    sessionService = module.get(SessionService)
    codeService = module.get(CodeService)
    notificationsService = module.get(NotificationsService)
    userDBService = module.get(UserDBService)
  })

  describe('tel', () => {
    it('should create code', async () => {
      try {
        await authService.tel(
          {
            tel: '',
            browser: '',
            os: '',
          },
          ''
        )
      } catch (_) {
        //
      } finally {
        expect(jest.spyOn(codeService, 'create')).toBeCalled()
      }
    })

    it('should send notification', async () => {
      try {
        await authService.tel(
          {
            tel: '',
            browser: '',
            os: '',
          },
          ''
        )
      } catch (_) {
        //
      } finally {
        expect(jest.spyOn(notificationsService, 'sendAuthNotification')).toBeCalled()
      }
    })

    describe('failed to send notification', () => {
      beforeEach(() => {
        jest
          .spyOn(notificationsService, 'sendAuthNotification')
          .mockReturnValue(Promise.resolve(false))
      })

      it('should delete code', async () => {
        try {
          await authService.tel({ tel: '', browser: '', os: '' }, '')
        } catch (_) {
          //
        } finally {
          expect(jest.spyOn(codeService, 'delete')).toHaveBeenCalled()
        }
      })

      it('should throw bad request error', async () => {
        await expect(
          authService.tel({ tel: '', browser: '', os: '' }, '')
        ).rejects.toThrowError(BadRequestException)
      })
    })
  })

  describe('code', () => {
    it('should verify code', async () => {
      try {
        await authService.code(
          {
            code: 0,
            name: '',
            tel: '',
            browser: '',
            os: '',
          },
          ''
        )
      } catch (_) {
        //
      } finally {
        expect(jest.spyOn(codeService, 'verify')).toBeCalled()
      }
    })

    it('should find user', async () => {
      try {
        await authService.code(
          {
            code: 0,
            name: '',
            tel: '',
            browser: '',
            os: '',
          },
          ''
        )
      } catch (_) {
        //
      } finally {
        expect(jest.spyOn(userDBService, 'findByTel')).toBeCalled()
      }
    })

    describe('user not find', () => {
      beforeEach(() => {
        jest.spyOn(userDBService, 'findByTel').mockReturnValue(Promise.resolve(null))
      })

      it('should throw bad request error if name is missing', async () => {
        await expect(
          authService.code({ tel: '', code: 0, browser: '', os: '', name: '' }, '')
        ).rejects.toThrowError(NotAcceptableException)
      })

      it('should create new user if name is not missing', async () => {
        const createUserSpy = jest.spyOn(userDBService, 'create')

        createUserSpy.mockReturnValue(
          Promise.resolve({
            id: 0,
            name: 'test',
            tel: 'test',
          })
        )

        await authService.code({ tel: '', code: 0, browser: '', os: '', name: 'test' }, '')

        expect(createUserSpy).toBeCalled()
      })
    })

    it('should delete code', async () => {
      try {
        await authService.code(
          {
            code: 0,
            name: '',
            tel: '',
            browser: '',
            os: '',
          },
          ''
        )
      } catch (_) {
        //
      } finally {
        expect(jest.spyOn(codeService, 'delete')).toBeCalled()
      }
    })

    it('should create session', async () => {
      jest.spyOn(userDBService, 'findByTel').mockReturnValue(
        Promise.resolve({
          id: 0,
          tel: '',
          name: '',
        })
      )

      try {
        await authService.code(
          {
            code: 0,
            name: 'test',
            tel: '',
            browser: '',
            os: '',
          },
          ''
        )
      } catch (_) {
        //
      } finally {
        expect(jest.spyOn(sessionService, 'create')).toBeCalled()
      }
    })
  })

  describe('refresh-session', () => {
    it('should verify session', async () => {
      try {
        await authService.refreshSession(
          { refreshToken: '', accessToken: '', browser: '', os: '' },
          ''
        )
      } catch (_) {
        //
      } finally {
        expect(jest.spyOn(sessionService, 'verify')).toBeCalled()
      }
    })

    it('should create new session', async () => {
      try {
        await authService.refreshSession(
          { refreshToken: '', accessToken: '', browser: '', os: '' },
          ''
        )
      } catch (_) {
        //
      } finally {
        expect(jest.spyOn(sessionService, 'create')).toBeCalled()
      }
    })
  })
})
