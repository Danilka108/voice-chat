import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { CacheManager } from '../../cache/cache-manager'
import { CacheCodeService } from './cache-code.service'

describe('CacheCodeService', () => {
  let cacheCodeService: CacheCodeService
  let cacheManager: CacheManager

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CacheCodeService,
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

    cacheCodeService = module.get(CacheCodeService)
    cacheManager = module.get(CacheManager)
  })

  describe('set', () => {
    it('should call cacheManager', async () => {
      await cacheCodeService.set(
        {
          tel: 'test',
          browser: '',
          ip: '',
          os: '',
        },
        999999
      )

      expect(jest.spyOn(cacheManager, 'set')).toBeCalled()
    })
  })

  describe('get', () => {
    beforeEach(() => {
      jest.spyOn(JSON, 'parse').mockReturnValue('')
    })

    it('should call cacheManager', async () => {
      await cacheCodeService.get({
        tel: '',
        browser: '',
        ip: '',
        os: '',
      })

      expect(jest.spyOn(cacheManager, 'get')).toBeCalled()
    })

    it('should return null if not found data', async () => {
      jest.spyOn(cacheManager, 'get').mockReturnValue(Promise.resolve(null))

      await expect(
        cacheCodeService.get({
          tel: '',
          browser: '',
          ip: '',
          os: '',
        })
      ).resolves.toBeNull()
    })

    it('should return null if found data is not valid', async () => {
      await expect(
        cacheCodeService.get({
          tel: '',
          browser: '',
          ip: '',
          os: '',
        })
      ).resolves.toBeNull()
    })
  })

  describe('del', async () => {
    it('should call cacheManager', async () => {
      await cacheCodeService.del({
        tel: '',
        browser: '',
        ip: '',
        os: '',
      })

      expect(jest.spyOn(cacheManager, 'del')).toBeCalled()
    })
  })
})
