import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CacheManager, CACHE_MANAGER } from '../cache-manager'
import { CacheAuthCode, CacheAuthCodeValue } from '../interfaces/auth-code.interface'
import { isCacheAuthCodeValue } from '../validators/is-cache-auth-code-value'

@Injectable()
export class CacheAuthCodeService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheManager,
    private readonly configService: ConfigService
  ) {}

  async set(data: CacheAuthCode, code: number): Promise<void> {
    const key = JSON.stringify(
      { data, tel: data.tel.replace(/\s/g, '') },
      Object.keys(data).sort()
    )

    const value: CacheAuthCodeValue = {
      code,
      createdAt: Date.now(),
    }

    const codeTTL = this.configService.get<number>('auth.code.ttl') || 0

    await this.cacheManager.set(key, JSON.stringify(value), 'EX', codeTTL)
  }

  async get(data: CacheAuthCode): Promise<CacheAuthCodeValue | null> {
    const key = JSON.stringify(
      { data, tel: data.tel.replace(/\s/g, '') },
      Object.keys(data).sort()
    )

    const cachedDataValue = await this.cacheManager.get(key)

    if (cachedDataValue === null) return null

    const valueData = JSON.parse(cachedDataValue)

    if (!isCacheAuthCodeValue(valueData)) return null

    return valueData
  }

  async del(data: CacheAuthCode): Promise<void> {
    const key = JSON.stringify(
      { data, tel: data.tel.replace(/\s/g, '') },
      Object.keys(data).sort()
    )

    await this.cacheManager.del(key)
  }
}
