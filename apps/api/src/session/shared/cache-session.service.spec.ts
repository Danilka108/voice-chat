import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { CacheManager } from '../../cache/cache-manager'
import { CacheSessionService } from './cache-session.service'

describe('CacheSessionService', () => {
  let cacheSessionService: CacheSessionService
  let cacheManager: CacheManager

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CacheSessionService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: CacheManager,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
      ],
    }).compile()

    cacheSessionService = module.get(CacheSessionService)
    cacheManager = module.get(CacheManager)
  })

  describe('set', () => {
    it('should call cacheManager', async () => {
      await cacheSessionService.set(
        {
          id: 0,
          ip: 'test',
          os: 'test',
          browser: 'test',
        },
        'test'
      )

      expect(jest.spyOn(cacheManager, 'set')).toBeCalled()
    })
  })

  describe('get', () => {
    beforeEach(() => {
      jest.spyOn(JSON, 'parse').mockReturnValue('')
    })

    it('should call cacheManager', async () => {
      await cacheSessionService.get({
        id: 0,
        browser: '',
        ip: '',
        os: '',
      })

      expect(jest.spyOn(cacheManager, 'get')).toBeCalled()
    })

    it('should return null if not found data', async () => {
      jest.spyOn(cacheManager, 'get').mockReturnValue(Promise.resolve(null))

      await expect(
        cacheSessionService.get({
          id: 0,
          browser: '',
          ip: '',
          os: '',
        })
      ).resolves.toBeNull()
    })

    it('should return null if found data is not valid', async () => {
      await expect(
        cacheSessionService.get({
          id: 0,
          browser: '',
          ip: '',
          os: '',
        })
      ).resolves.toBeNull()
    })
  })

  describe('del', () => {
    it('should call cacheManager', async () => {
      await cacheSessionService.del({
        id: 0,
        browser: '',
        ip: '',
        os: '',
      })

      expect(jest.spyOn(cacheManager, 'del')).toBeCalled()
    })
  })
})
