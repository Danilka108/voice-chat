import { ForbiddenException, Injectable, NotAcceptableException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CacheCode } from '../interfaces/code.interface'
import { CacheCodeService } from '../shared/cache-code.service'
import * as crypto from 'crypto'

@Injectable()
export class CodeService {
  constructor(
    private readonly configService: ConfigService,
    private readonly cacheCodeService: CacheCodeService
  ) {}

  private generateCode(): number {
    const codeLen = this.configService.get<number>('auth.code.len') || 0

    let min = '1'
    let max = ''

    for (let i = 0; i < codeLen; i++) {
      if (i !== 0) {
        min += '0'
      }

      max += '9'
    }

    const code = crypto.randomInt(parseInt(min), parseInt(max))

    return code
  }

  async create(cacheCodeKey: CacheCode) {
    const code = this.generateCode()
    const cacheCodeValue = await this.cacheCodeService.get(cacheCodeKey)

    const periodOfBanOfRefreshCode =
      this.configService.get<number>('auth.code.periodOfBanOfRefresh') || 0

    if (
      cacheCodeValue !== null &&
      (Date.now() - cacheCodeValue.createdAt) / 1000 <= periodOfBanOfRefreshCode
    ) {
      throw new NotAcceptableException(
        `The waiting time for sending a message is ${
          periodOfBanOfRefreshCode / 60
        } minutes. Wait ${
          periodOfBanOfRefreshCode - Math.round((Date.now() - cacheCodeValue.createdAt) / 1000)
        } seconds.`
      )
    }

    await this.cacheCodeService.set(cacheCodeKey, code)

    return code
  }

  async verify(cacheCodeKey: CacheCode, code: number) {
    const codeCacheValue = await this.cacheCodeService.get(cacheCodeKey)

    if (codeCacheValue === null || codeCacheValue.code !== code)
      throw new ForbiddenException('Failed verify code.')
  }

  async delete(cacheCodeKey: CacheCode) {
    await this.cacheCodeService.del(cacheCodeKey)
  }
}
