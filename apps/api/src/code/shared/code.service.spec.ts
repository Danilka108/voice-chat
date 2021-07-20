import { ForbiddenException, NotAcceptableException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { ExecutionStepContextContext } from 'twilio/lib/rest/studio/v1/flow/execution/executionStep/executionStepContext'
import { CacheCode, CacheCodeValue } from '../interfaces/code.interface'
import { CacheCodeService } from './cache-code.service'
import { CodeService } from './code.service'

describe('codeService', () => {
  let codeService: CodeService
  let cacheCodeService: CacheCodeService
  let configService: ConfigService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CodeService,
        {
          provide: CacheCodeService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile()

    codeService = module.get(CodeService)
    cacheCodeService = module.get(CacheCodeService)
    configService = module.get(ConfigService)
  })

  describe('create', () => {
    const t = 9999999999
    const deltaT = 1000 * 60
    let getSpy: jest.SpyInstance<Promise<CacheCodeValue | null>, [key: CacheCode]>

    beforeEach(() => {
      jest.spyOn(Date, 'now').mockReturnValue(t)

      jest.spyOn(configService, 'get').mockImplementation((path) => {
        if (path === 'auth.code.len') return 6
        if (path === 'auth.code.periodOfBanOfRefresh') return deltaT / 1000 + 1000
      })

      getSpy = jest.spyOn(cacheCodeService, 'get')

      getSpy.mockReturnValue(
        Promise.resolve({
          code: 999999,
          createdAt: t - deltaT,
        })
      )
    })

    it('should find auth code in cache', async () => {
      try {
        await codeService.create({
          tel: 'test',
          os: 'test',
          ip: 'test',
          browser: 'test',
        })
      } catch (_) {
        //
      } finally {
        expect(getSpy).toBeCalled()
      }
    })

    it('should throw not acceptable error if if the period of ban of refresh code has not expired', async () => {
      await expect(
        codeService.create({
          tel: 'test',
          os: 'test',
          ip: 'test',
          browser: 'test',
        })
      ).rejects.toThrowError(NotAcceptableException)
    })

    it('should set new auth code to cache', async () => {
      getSpy.mockReturnValue(Promise.resolve(null))

      try {
        await codeService.create({
          tel: 'test',
          os: 'test',
          ip: 'test',
          browser: 'test',
        })
      } catch (_) {
        //
      } finally {
        expect(jest.spyOn(cacheCodeService, 'set')).toBeCalled()
      }
    })
  })

  describe('verify', () => {
    it('should find auth code in cache', async () => {
      try {
        await codeService.verify(
          {
            tel: 'test',
            os: 'test',
            browser: 'test',
            ip: 'test',
          },
          999999
        )
      } catch (_) {
        //
      } finally {
        expect(jest.spyOn(cacheCodeService, 'get')).toBeCalled()
      }
    })

    it('should throw forbidden error if auth code is not in cache', async () => {
      jest.spyOn(cacheCodeService, 'get').mockReturnValue(Promise.resolve(null))

      await expect(
        codeService.verify(
          {
            tel: 'test',
            os: 'test',
            browser: 'test',
            ip: 'test',
          },
          999999
        )
      ).rejects.toThrowError(ForbiddenException)
    })

    it('should throw forbidden error if auth code from cache is invalid', async () => {
      jest.spyOn(cacheCodeService, 'get').mockReturnValue(
        Promise.resolve({
          code: 999999,
          createdAt: 0,
        })
      )

      await expect(
        codeService.verify(
          {
            tel: 'test',
            os: 'test',
            browser: 'test',
            ip: 'test',
          },
          100000
        )
      ).rejects.toThrowError(ForbiddenException)
    })
  })

  describe('delete', () => {
    it('should delete auth code from cache', async () => {
      await codeService.delete({
        tel: 'test',
        os: 'test',
        browser: 'test',
        ip: 'test',
      })

      expect(jest.spyOn(cacheCodeService, 'del')).toBeCalled()
    })
  })
})
