import { Inject, Injectable } from '@nestjs/common'
import { CacheManager } from '../../cache'
import { CodeConfig, CODE_CONFIG } from '../../configs'
import { CacheCode, CacheCodeValue } from '../interfaces'
import { isCacheCodeValue } from '../guards'

@Injectable()
export class CacheCodeService {
  constructor(
    private readonly cacheManager: CacheManager,
    @Inject(CODE_CONFIG) private readonly config: CodeConfig
  ) {}

  private createKey(data: CacheCode) {
    return JSON.stringify(
      Object.assign(data, { tel: data.tel.replace(/\s/g, '') }),
      Object.keys(data).sort()
    )
  }

  private createValue(data: CacheCodeValue) {
    return JSON.stringify(data)
  }

  async set(key: CacheCode, code: number) {
    const cacheKey = this.createKey(key)
    const cacheValue = this.createValue({
      code,
      createdAt: Date.now(),
    })

    const codeTTL = this.config.ttl

    await this.cacheManager.set(cacheKey, cacheValue, 'EX', codeTTL)
  }

  async get(key: CacheCode) {
    const cacheKey = this.createKey(key)

    const cacheValue = await this.cacheManager.get(cacheKey)

    if (cacheValue === null) return null

    const parsedCacheValue = JSON.parse(cacheValue)

    if (!isCacheCodeValue(parsedCacheValue)) return null

    return parsedCacheValue
  }

  async del(data: CacheCode) {
    const key = this.createKey(data)

    await this.cacheManager.del(key)
  }
}
