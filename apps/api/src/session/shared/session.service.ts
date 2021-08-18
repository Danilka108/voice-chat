import { ForbiddenException, Injectable } from '@nestjs/common'
import { CacheSession } from '../interfaces/session.interface'
import { CacheSessionService } from './cache-session.service'
import { isCacheSession } from '../guards/is-cache-session'
import { TokenService } from '../../token/token.service'
import { UserAuthorizationData, UserIdentificationData } from '@voice-chat/user-interfaces'

@Injectable()
export class SessionService {
  constructor(
    private readonly cacheService: CacheSessionService,
    private readonly tokenService: TokenService
  ) {}

  async create(
    accessToken: string,
    userIdentificationData: UserIdentificationData
  ): Promise<UserAuthorizationData>
  async create(tel: string, cacheSessionKey: CacheSession): Promise<UserAuthorizationData>
  async create(
    arg1: string,
    arg2: UserIdentificationData | CacheSession
  ): Promise<UserAuthorizationData> {
    if (isCacheSession(arg2)) {
      const tel = arg1
      const cacheSessionKey = arg2

      const accessToken = this.tokenService.createAccessToken({
        userID: cacheSessionKey.id,
        tel: tel,
      })
      const refreshToken = this.tokenService.createRefreshToken()

      await this.cacheService.set(cacheSessionKey, refreshToken)

      return {
        accessToken,
        refreshToken,
      }
    }

    const oldAccessToken = arg1
    const userIdentificationData = arg2

    const decoded = this.tokenService.decodeAccessToken(oldAccessToken)

    if (!decoded) throw new ForbiddenException('Failed verify session.')

    const accessToken = this.tokenService.createAccessToken(decoded)
    const refreshToken = this.tokenService.createRefreshToken()

    await this.cacheService.set({ id: decoded.userID, userIdentificationData }, refreshToken)

    return {
      accessToken,
      refreshToken,
    }
  }

  async verify(
    userAuthorizationData: UserAuthorizationData,
    userIdentificationData: UserIdentificationData
  ) {
    const decoded = this.tokenService.decodeAccessToken(userAuthorizationData.accessToken)

    if (!decoded) {
      throw new ForbiddenException('Failed verify session.')
    }

    const cacheValue = await this.cacheService.get({
      id: decoded.userID,
      userIdentificationData,
    })

    if (
      cacheValue === null ||
      cacheValue.refreshToken !== userAuthorizationData.refreshToken
    ) {
      throw new ForbiddenException('Failed verify session.')
    }
  }

  async delete(
    userAuthorizationData: UserAuthorizationData,
    userIdentificationData: UserIdentificationData
  ) {
    const decoded = this.tokenService.decodeAccessToken(userAuthorizationData.accessToken)

    if (!decoded) {
      throw new ForbiddenException('Failed verify session.')
    }

    await this.cacheService.del({
      id: decoded.userID,
      userIdentificationData,
    })
  }
}
