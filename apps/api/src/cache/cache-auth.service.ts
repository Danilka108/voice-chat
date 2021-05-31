import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cache } from 'cache-manager'
import {
  CacheAuthSession,
  CacheAuthSessionValue,
} from './interfaces/auth-session.interface'
import { isAuthSessionValue } from './is-auth-session-value'

@Injectable()
export class CacheAuthService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService
  ) {}

  async set(session: CacheAuthSession, code: number) {
    const value: CacheAuthSessionValue = {
      code,
      createdAt: Date.now(),
    }

    const codeTTL = this.configService.get<number>('auth.codeTTL') ?? 0

    await this.cacheManager.set(
      JSON.stringify(session),
      JSON.stringify(value),
      codeTTL
    )
  }

  async get(session: CacheAuthSession) {
    const cachedValueData = await this.cacheManager.get(JSON.stringify(session))

    if (typeof cachedValueData !== 'string') return null

    const valueData = JSON.parse(cachedValueData)

    if (!isAuthSessionValue(valueData)) return null

    return valueData
  }

  async del(session: CacheAuthSession): Promise<void> {
    await this.cacheManager.del(JSON.stringify(session))
  }
}
