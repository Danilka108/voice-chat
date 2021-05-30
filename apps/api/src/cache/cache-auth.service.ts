import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cache } from 'cache-manager'
import {
  CacheAuthSession,
  CacheAuthSessionValue,
} from './interfaces/auth-session.interface'

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

    await this.cacheManager.set(JSON.stringify(session), value, codeTTL)
  }

  async get(session: CacheAuthSession): Promise<CacheAuthSessionValue | null> {
    return (await this.cacheManager.get(JSON.stringify(session))) ?? null
  }
}
