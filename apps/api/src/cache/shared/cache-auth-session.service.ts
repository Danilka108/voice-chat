import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cache } from 'cache-manager'
import {
  CacheAuthSession,
  CacheAuthSessionValue,
} from '../interfaces/auth-session.interface'
import { isCacheAuthSessionValue } from '../validators/is-cache-auth-session-value'

@Injectable()
export class CacheAuthSessionService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService
  ) {}

  async set(data: CacheAuthSession, refreshToken: string) {
    const value: CacheAuthSessionValue = {
      refreshToken,
    }

    const sessionTTL = this.configService.get<number>('auth.session.ttl') ?? 0

    await this.cacheManager.set(
      JSON.stringify(data),
      JSON.stringify(value),
      sessionTTL
    )
  }

  async get(data: CacheAuthSession) {
    const cachedDataValue = await this.cacheManager.get(JSON.stringify(data))

    if (typeof cachedDataValue !== 'string') return null

    const valueData = JSON.parse(cachedDataValue)

    if (!isCacheAuthSessionValue(valueData)) return null

    return valueData
  }

  async del(data: CacheAuthSession): Promise<void> {
    await this.cacheManager.del(JSON.stringify(data))
  }
}
