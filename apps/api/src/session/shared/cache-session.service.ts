import { Inject, Injectable } from '@nestjs/common'
import { CacheSession, CacheSessionValue } from '../interfaces/session.interface'
import { CacheManager } from '../../cache/cache-manager'
import { SessionConfig, SESSION_CONFIG } from '../../config/session.config'
import { isCacheSessionValue } from '../guards/is-cache-session-value'

@Injectable()
export class CacheSessionService {
  constructor(
    private readonly cacheManager: CacheManager,
    @Inject(SESSION_CONFIG) private readonly config: SessionConfig
  ) {}

  private createKey(data: CacheSession) {
    return JSON.stringify(data, Object.keys(data).sort())
  }

  private createValue(data: CacheSessionValue) {
    return JSON.stringify(data)
  }

  async set(key: CacheSession, refreshToken: string) {
    const cacheKey = this.createKey(key)
    const cacheValue = this.createValue({ refreshToken })

    const sessionTTL = this.config.ttl

    await this.cacheManager.set(cacheKey, cacheValue, 'EX', sessionTTL)
  }

  async get(key: CacheSession) {
    const cacheKey = this.createKey(key)
    const cacheValue = await this.cacheManager.get(cacheKey)

    if (cacheValue === null) return null

    const parsedCacheValue = JSON.parse(cacheValue)

    if (!isCacheSessionValue(parsedCacheValue)) return null

    return parsedCacheValue
  }

  async del(key: CacheSession): Promise<void> {
    const cacheKey = this.createKey(key)

    await this.cacheManager.del(cacheKey)
  }
}
