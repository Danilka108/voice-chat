import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import * as isAuthDecodedModule from '../common/validators/is-auth-decoded.validator'
import { SessionService } from './session.service'
import * as jwt from 'jsonwebtoken'

describe('SessionService', () => {
  let sessionService: SessionService

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        SessionService,
      ],
    }).compile()

    sessionService = testingModule.get(SessionService)
  })

  describe('decodeAccessToken', () => {
    it('should return null if impossible decode access token', () => {
      jest.spyOn(isAuthDecodedModule, 'isAuthDecoded').mockReturnValue(false)
      jest.spyOn(jwt, 'decode').mockReturnValue({})

      expect(sessionService.decodeAccessToken('')).toBeNull()
    })
  })

  describe('verifyAccessToken', () => {
    it('should return null if verify failed', async () => {
      jest.spyOn(isAuthDecodedModule, 'isAuthDecoded').mockReturnValue(true)

      jest
        .spyOn(jwt, 'verify')
        .mockImplementation(
          (
            token: string,
            secretOrPublicKey: jwt.Secret | jwt.GetPublicKeyOrSecret,
            options?: jwt.VerifyOptions,
            callback?: jwt.VerifyCallback
          ) => {
            expect(callback).toBeDefined()

            if (callback) {
              callback(new jwt.JsonWebTokenError(''), undefined)
            }
          }
        )

      await expect(sessionService.verifyAccessToken('')).resolves.toBeNull()
    })

    it('should return null if invalid decoded data', async () => {
      jest.spyOn(isAuthDecodedModule, 'isAuthDecoded').mockReturnValue(false)

      jest
        .spyOn(jwt, 'verify')
        .mockImplementation(
          (
            token: string,
            secretOrPublicKey: jwt.Secret | jwt.GetPublicKeyOrSecret,
            options?: jwt.VerifyOptions,
            callback?: jwt.VerifyCallback
          ) => {
            expect(callback).toBeDefined()

            if (callback) {
              callback(null, undefined)
            }
          }
        )

      await expect(sessionService.verifyAccessToken('')).resolves.toBeNull()
    })
  })
})
