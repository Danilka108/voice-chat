import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cache } from 'cache-manager'
import {
  CacheAuthCode,
  CacheAuthCodeValue,
} from '../interfaces/auth-code.interface'
import { isCacheAuthCodeValue } from '../validators/is-cache-auth-code-value'

@Injectable()
export class CacheAuthCodeService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService
  ) {}

  async set(data: CacheAuthCode, code: number): Promise<void> {
    const value: CacheAuthCodeValue = {
      code,
      createdAt: Date.now(),
    }

    const codeTTL = this.configService.get<number>('auth.code.ttl') || 0

    await this.cacheManager.set(
      JSON.stringify(data),
      JSON.stringify(value),
      codeTTL
    )
  }

  async get(data: CacheAuthCode): Promise<CacheAuthCodeValue | null> {
    const cachedDataValue = await this.cacheManager.get(JSON.stringify(data))

    if (typeof cachedDataValue !== 'string') return null

    const valueData = JSON.parse(cachedDataValue)

    if (!isCacheAuthCodeValue(valueData)) return null

    return valueData
  }

  async del(data: CacheAuthCode): Promise<void> {
    await this.cacheManager.del(JSON.stringify(data))
  }
}
