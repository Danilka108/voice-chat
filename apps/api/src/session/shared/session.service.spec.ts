import { ForbiddenException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { TokenService } from '../../token/token.service'
import { CacheSessionService } from './cache-session.service'
import { SessionService } from './session.service'

jest.mock('../../token/token.service')
jest.mock('./cache-session.service')

describe('SessionService', () => {
  let sessionService: SessionService
  let cacheSessionService: CacheSessionService
  let tokenService: TokenService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SessionService, CacheSessionService, TokenService],
    }).compile()

    sessionService = module.get(SessionService)
    cacheSessionService = module.get(CacheSessionService)
    tokenService = module.get(TokenService)
  })

  describe('verify', () => {
    it('should throw forbidden error if failed decode access token', async () => {
      jest.spyOn(tokenService, 'decodeAccessToken').mockReturnValue(null)

      await expect(sessionService.verify('', '', '', '', '')).rejects.toThrowError(
        ForbiddenException
      )
    })

    it('should throw forbidden error if not found session in cache', async () => {
      jest.spyOn(tokenService, 'decodeAccessToken').mockReturnValue({
        userID: 0,
        tel: '',
      })

      jest.spyOn(cacheSessionService, 'get').mockReturnValue(Promise.resolve(null))

      await expect(sessionService.verify('', '', '', '', '')).rejects.toThrowError(
        ForbiddenException
      )
    })

    it('should throw forbidden error if found session is invalid', async () => {
      jest.spyOn(tokenService, 'decodeAccessToken').mockReturnValue({
        userID: 0,
        tel: '',
      })

      jest.spyOn(cacheSessionService, 'get').mockReturnValue(
        Promise.resolve({
          refreshToken: 'test',
        })
      )

      await expect(sessionService.verify('', '', '', '', '')).rejects.toThrowError(
        ForbiddenException
      )
    })
  })

  describe('create', () => {
    describe('by tel and cacheSession', () => {
      jest.mock('../validators/is-cache-session.validator', () => ({
        isCacheSession: jest.fn().mockReturnValue(true),
      }))

      it('should create access token', async () => {
        await sessionService.create('', {
          id: 0,
          ip: '',
          browser: '',
          os: '',
        })

        expect(jest.spyOn(tokenService, 'createAccessToken')).toBeCalled()
      })

      it('should create refresh token', async () => {
        await sessionService.create('', {
          id: 0,
          ip: '',
          browser: '',
          os: '',
        })

        expect(jest.spyOn(tokenService, 'createRefreshToken')).toBeCalled()
      })

      it('should set new session in cache', async () => {
        await sessionService.create('', {
          id: 0,
          ip: '',
          browser: '',
          os: '',
        })

        expect(jest.spyOn(cacheSessionService, 'set')).toBeCalled()
      })
    })

    describe('by accessToken and user markers', () => {
      jest.mock('../validators/is-cache-session.validator', () => ({
        isCacheSession: jest.fn().mockReturnValue(false),
      }))

      beforeEach(() => {
        jest.spyOn(tokenService, 'decodeAccessToken').mockReturnValue({
          tel: '',
          userID: 0,
        })
      })

      it('should throw forbidden error if failed decode access token', async () => {
        jest.spyOn(tokenService, 'decodeAccessToken').mockReturnValue(null)

        await expect(
          sessionService.create('', {
            browser: '',
            os: '',
            ip: '',
          })
        ).rejects.toThrowError(ForbiddenException)
      })

      it('should create access token', async () => {
        await sessionService.create('', {
          browser: '',
          os: '',
          ip: '',
        })

        expect(jest.spyOn(tokenService, 'createAccessToken')).toBeCalled()
      })

      it('should create refresh token', async () => {
        await sessionService.create('', {
          browser: '',
          os: '',
          ip: '',
        })

        expect(jest.spyOn(tokenService, 'createRefreshToken')).toBeCalled()
      })

      it('should set new session in cache', async () => {
        await sessionService.create('', {
          browser: '',
          os: '',
          ip: '',
        })

        expect(jest.spyOn(cacheSessionService, 'set')).toBeCalled()
      })
    })
  })
})
