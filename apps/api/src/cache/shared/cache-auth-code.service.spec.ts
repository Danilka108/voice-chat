import { Test } from '@nestjs/testing'
import { CacheManager, CACHE_MANAGER } from '../cache-manager'
import * as IORedis from 'ioredis'
import { ConfigService } from '@nestjs/config'
import { CacheAuthCodeService } from './cache-auth-code.service'
import { CacheAuthCode, CacheAuthCodeValue } from '../interfaces/auth-code.interface'

jest.mock('@nestjs/config')
jest.mock('ioredis')

describe('CacheAuthCodeService', () => {
  let cacheManager: CacheManager
  let configService: ConfigService
  let cacheAuthCodeService: CacheAuthCodeService

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CACHE_MANAGER,
          useClass: IORedis,
        },
        ConfigService,
        CacheAuthCodeService,
      ],
    }).compile()

    cacheManager = testingModule.get(CACHE_MANAGER)
    configService = testingModule.get(ConfigService)
    cacheAuthCodeService = testingModule.get(CacheAuthCodeService)
  })

  describe('set', () => {
    it('should call cacheManager with correct arguments', async () => {
      jest.spyOn(configService, 'get').mockReturnValue(1000)
      jest.spyOn(Date, 'now').mockReturnValue(0)
      const setSpy = jest.spyOn(cacheManager, 'set')

      const key: CacheAuthCode = {
        tel: '+00000000000',
        browser: 'firefox',
        os: 'linux',
        ip: '127.0.0.1',
      }

      const value: CacheAuthCodeValue = {
        code: 999999,
        createdAt: 0,
      }

      await cacheAuthCodeService.set(key, 999999)

      expect(setSpy).toBeCalledWith(JSON.stringify(key), JSON.stringify(value), 'EX', 1000)
    })
  })

  describe('get', () => {
    let key: CacheAuthCode
    let getSpy: jest.SpyInstance<Promise<string | null>, [key: IORedis.KeyType]>

    beforeEach(() => {
      key = {
        tel: '+00000000000',
        browser: 'firefox',
        os: 'linux',
        ip: '127.0.0.1',
      }

      getSpy = jest.spyOn(cacheManager, 'get')

      jest.spyOn(JSON, 'parse').mockReturnValue({
        code: 0,
        createdAt: 0,
      })
    })
    it('should call cacheManager with correct arguments', async () => {
      await cacheAuthCodeService.get(key)

      expect(getSpy).toBeCalledWith(JSON.stringify(key))
    })

    it("should return null if cacheManager doesn't found data", async () => {
      getSpy.mockReturnValue(Promise.resolve(null))

      await expect(cacheAuthCodeService.get(key)).resolves.toBeNull()
    })

    it('should return null if cacheManager return invalid value', async () => {
      jest.spyOn(JSON, 'parse').mockReturnValue({})

      await expect(cacheAuthCodeService.get(key)).resolves.toBeNull()
    })
  })

  describe('del', () => {
    let key: CacheAuthCode
    let delSpy: jest.SpyInstance<Promise<number>, [arg1: IORedis.KeyType[]]>

    beforeEach(() => {
      key = {
        tel: '+00000000000',
        browser: 'firefox',
        os: 'linux',
        ip: '127.0.0.1',
      }

      delSpy = jest.spyOn(cacheManager, 'del')
    })

    it('should call cacheManager with correct arguments', async () => {
      await cacheAuthCodeService.del(key)

      expect(delSpy).toBeCalledWith(JSON.stringify(key))
    })
  })
})
