import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import IORedis = require('ioredis')
import { CacheManager, CACHE_MANAGER } from '../cache-manager'
import { CacheAuthSession, CacheAuthSessionValue } from '../interfaces/auth-session.interface'
import { CacheAuthSessionService } from './cache-auth-session.service'

jest.mock('ioredis')
jest.mock('@nestjs/config')

describe('CacheAuthSessionService', () => {
  let cacheManager: CacheManager
  let cacheAuthSessionService: CacheAuthSessionService
  let configService: ConfigService

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        CacheAuthSessionService,
        {
          provide: CACHE_MANAGER,
          useClass: IORedis,
        },
        ConfigService,
      ],
    }).compile()

    cacheManager = testingModule.get(CACHE_MANAGER)
    cacheAuthSessionService = testingModule.get(CacheAuthSessionService)
    configService = testingModule.get(ConfigService)
  })

  describe('set', () => {
    it('should call cacheManager with correct arguments', async () => {
      jest.spyOn(configService, 'get').mockReturnValue(1000)
      const setSpy = jest.spyOn(cacheManager, 'set')

      const key: CacheAuthSession = {
        id: 0,
        browser: 'firefox',
        os: 'linux',
        ip: '127.0.0.1',
      }

      const value: CacheAuthSessionValue = {
        refreshToken: 'abc',
      }

      await cacheAuthSessionService.set(key, 'abc')

      expect(setSpy).toBeCalledWith(JSON.stringify(key), JSON.stringify(value), 'EX', 1000)
    })
  })

  describe('get', () => {
    let key: CacheAuthSession
    let getSpy: jest.SpyInstance<Promise<string | null>, [key: IORedis.KeyType]>

    beforeEach(() => {
      key = {
        id: 0,
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
      await cacheAuthSessionService.get(key)

      expect(getSpy).toBeCalledWith(JSON.stringify(key))
    })

    it("should return null if cacheManager doesn't found data", async () => {
      getSpy.mockReturnValue(Promise.resolve(null))

      await expect(cacheAuthSessionService.get(key)).resolves.toBeNull()
    })

    it('should return null if cacheManager return invalid value', async () => {
      jest.spyOn(JSON, 'parse').mockReturnValue({})

      await expect(cacheAuthSessionService.get(key)).resolves.toBeNull()
    })
  })

  describe('del', () => {
    let key: CacheAuthSession
    let delSpy: jest.SpyInstance<Promise<number>, [arg1: IORedis.KeyType[]]>

    beforeEach(() => {
      key = {
        id: 0,
        browser: 'firefox',
        os: 'linux',
        ip: '127.0.0.1',
      }

      delSpy = jest.spyOn(cacheManager, 'del')
    })

    it('should call cacheManager with correct arguments', async () => {
      await cacheAuthSessionService.del(key)

      expect(delSpy).toBeCalledWith(JSON.stringify(key))
    })
  })
})
