import {
  ForbiddenException,
  Inject,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common'
import { CacheCode } from '../interfaces'
import { CacheCodeService } from './cache-code.service'
import * as crypto from 'crypto'
import { CodeConfig, CODE_CONFIG } from '../../configs'

@Injectable()
export class CodeService {
  constructor(
    @Inject(CODE_CONFIG) private readonly config: CodeConfig,
    private readonly cacheCodeService: CacheCodeService
  ) {}

  private generateCode(): number {
    const codeLen = this.config.len

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

    const periodOfBanOfRefreshCode = this.config.periodOfBanOfRefresh

    if (
      cacheCodeValue !== null &&
      (Date.now() - cacheCodeValue.createdAt) / 1000 <= periodOfBanOfRefreshCode
    ) {
      throw new NotAcceptableException(
        `Wait ${
          periodOfBanOfRefreshCode -
          Math.round((Date.now() - cacheCodeValue.createdAt) / 1000)
        } seconds for send a new auth code.`
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
