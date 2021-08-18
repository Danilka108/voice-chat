import { ForbiddenException, Injectable } from '@nestjs/common'
import { UserIdentificationData } from '@voice-chat/user-interfaces'
import { TokenService } from '../../token/token.service'
import { CacheInitProfile } from '../interfaces/init-profile.interface'
import { CacheInitProfileService } from './cache-init-profile.service'

@Injectable()
export class InitProfileService {
  constructor(
    private readonly cacheService: CacheInitProfileService,
    private readonly tokenService: TokenService
  ) {}

  async create(cacheInitProfileKey: CacheInitProfile) {
    const token = this.tokenService.createInitProfileToken()

    await this.cacheService.set(cacheInitProfileKey, token)

    return token
  }

  async verify(cacheInitProfileKey: CacheInitProfile, initProfileToken: string) {
    const cacheValue = await this.cacheService.get(cacheInitProfileKey)

    if (!cacheValue || cacheValue.initProfileToken !== initProfileToken) {
      throw new ForbiddenException('Failed verify init profile token.')
    }

    await this.delete(cacheInitProfileKey)
  }

  async delete(cacheInitProfileKey: CacheInitProfile) {
    await this.cacheService.del(cacheInitProfileKey)
  }
}
