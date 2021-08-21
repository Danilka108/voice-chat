import { Inject, Injectable } from '@nestjs/common'
import { CacheManager } from '../../cache'
import { InitProfileConfig, INIT_PROFILE_CONFIG } from '../../configs'
import { CacheInitProfile, CacheInitProfileValue } from '../interfaces'
import { isCacheInitProfileValue } from '../guards'

@Injectable()
export class CacheInitProfileService {
  constructor(
    private readonly cacheManager: CacheManager,
    @Inject(INIT_PROFILE_CONFIG) private readonly config: InitProfileConfig
  ) {}

  private createKey(data: CacheInitProfile) {
    return JSON.stringify(data, Object.keys(data).sort())
  }

  private createValue(data: CacheInitProfileValue) {
    return JSON.stringify(data)
  }

  async set(key: CacheInitProfile, initProfileToken: string) {
    const cacheKey = this.createKey(key)
    const cacheValue = this.createValue({ initProfileToken })

    const ttl = this.config.ttl

    await this.cacheManager.set(cacheKey, cacheValue, 'EX', ttl)
  }

  async get(key: CacheInitProfile) {
    const cacheKey = this.createKey(key)
    const cacheValue = await this.cacheManager.get(cacheKey)

    if (cacheValue === null) return null

    const parsedCacheValue = JSON.parse(cacheValue)

    if (!isCacheInitProfileValue(parsedCacheValue)) return null

    return parsedCacheValue
  }

  async del(key: CacheInitProfile) {
    const cacheKey = this.createKey(key)

    await this.cacheManager.del(cacheKey)
  }
}
