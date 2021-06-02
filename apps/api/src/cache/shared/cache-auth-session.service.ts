import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  CacheAuthSession,
  CacheAuthSessionValue,
} from '../interfaces/auth-session.interface'
import { CacheManager, CACHE_MANAGER } from '../cache-manager'
import { isCacheAuthSessionValue } from '../validators/is-cache-auth-session-value'

@Injectable()
export class CacheAuthSessionService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheManager,
    private readonly configService: ConfigService
  ) {}

  async set(data: CacheAuthSession, refreshToken: string) {
    const key: CacheAuthSession = {
      id: data.id,
      browser: data.browser,
      os: data.os,
      ip: data.ip,
    }

    const value: CacheAuthSessionValue = {
      refreshToken,
    }

    const sessionTTL = this.configService.get<number>('auth.session.ttl') || 0

    await this.cacheManager.set(
      JSON.stringify(key),
      JSON.stringify(value),
      'EX',
      sessionTTL
    )
  }

  async get(data: CacheAuthSession) {
    const key: CacheAuthSession = {
      id: data.id,
      browser: data.browser,
      os: data.os,
      ip: data.ip,
    }

    const cachedDataValue = await this.cacheManager.get(JSON.stringify(key))

    if (typeof cachedDataValue !== 'string') return null

    const dataValue = JSON.parse(cachedDataValue)

    if (!isCacheAuthSessionValue(dataValue)) return null

    return dataValue
  }

  async del(data: CacheAuthSession): Promise<void> {
    const key: CacheAuthSession = {
      id: data.id,
      browser: data.browser,
      os: data.os,
      ip: data.ip,
    }

    await this.cacheManager.del(JSON.stringify(key))
  }
}
