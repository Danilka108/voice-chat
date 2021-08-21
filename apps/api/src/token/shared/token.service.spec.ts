import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { TokenService } from './token.service'
import * as jwt from 'jsonwebtoken'
import { TokenManager, TOKEN_MANAGER } from './token-manager.factory'
import { CryptoManager, CRYPTO_MANAGER } from './crypto-manager.factory'

describe('TokenService', () => {
  let tokenService: TokenService
  let tokenManager: TokenManager
  let cryptoManager: CryptoManager

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: TOKEN_MANAGER,
          useValue: {
            sign: jest.fn(),
            decode: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: CRYPTO_MANAGER,
          useValue: {
            randomBytes: jest.fn(),
          },
        },
      ],
    }).compile()

    tokenService = module.get(TokenService)
    cryptoManager = module.get(CRYPTO_MANAGER)
    tokenManager = module.get(TOKEN_MANAGER)
  })

  describe('createAccessToken', () => {
    it('should call tokenManager', () => {
      tokenService.createAccessToken({
        tel: '',
        userID: 0,
      })

      expect(jest.spyOn(tokenManager, 'sign')).toBeCalled()
    })
  })

  describe('decodeAccessToken', () => {
    it('should call tokenManager', async () => {
      tokenService.decodeAccessToken('')

      expect(jest.spyOn(tokenManager, 'decode')).toBeCalled()
    })

    it('should return null if decoded data is invalid', async () => {
      jest.spyOn(tokenManager, 'decode').mockReturnValue(null)

      expect(tokenService.decodeAccessToken('')).toBeNull()
    })
  })

  describe('verifyAccessToken', () => {
    it('should return null if failed verify token', async () => {
      jest
        .spyOn(tokenManager, 'verify')
        .mockImplementation(
          (
            _: any,
            __: any,
            ___?: any,
            callback?: undefined | ((error: any, data: any) => void)
          ) => {
            if (callback) {
              callback('error', undefined)
            }
          }
        )

      await expect(tokenService.verifyAccessToken('')).resolves.toBeNull()
    })

    it('should return null if decoded data is invalid', async () => {
      jest
        .spyOn(tokenManager, 'verify')
        .mockImplementation(
          (
            _: any,
            __: any,
            ___?: any,
            callback?: undefined | ((error: any, data: any) => void)
          ) => {
            if (callback) {
              callback(undefined, undefined)
            }
          }
        )

      jest.mock('../common/validators/is-auth-decoded.validator', () => ({
        isAuthDecoded: (_: any) => false,
      }))

      await expect(tokenService.verifyAccessToken('')).resolves.toBeNull()
    })
  })

  describe('createRefreshToken', () => {
    it('should call cryptoManager', () => {
      const spy = jest.spyOn(cryptoManager, 'randomBytes')

      spy.mockImplementation((_: any) => ({
        toString: () => '',
      }))

      tokenService.createRefreshToken()

      expect(jest.spyOn(cryptoManager, 'randomBytes')).toBeCalled()
    })
  })
})
