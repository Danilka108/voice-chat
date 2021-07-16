import { ForbiddenException, Injectable } from '@nestjs/common'
import { CacheSession } from '../interfaces/session.interface'
import { CacheSessionService } from './cache-session.service'
import { isCacheSession } from '../validators/is-cache-session.validator'
import { TokenService } from '../../token/token.service'

@Injectable()
export class SessionService {
  constructor(
    private readonly cacheSessionService: CacheSessionService,
    private readonly tokenService: TokenService
  ) {}

  async create(
    accessToken: string,
    userMarkers: {
      browser: string
      os: string
      ip: string
    }
  ): Promise<{
    accessToken: string
    refreshToken: string
  }>
  async create(
    tel: string,
    cacheSessionKey: CacheSession
  ): Promise<{
    accessToken: string
    refreshToken: string
  }>
  async create(
    arg1: string,
    arg2:
      | CacheSession
      | {
          browser: string
          os: string
          ip: string
        }
  ) {
    if (isCacheSession(arg2)) {
      const tel = arg1
      const cacheSessionKey = arg2

      const accessToken = this.tokenService.createAccessToken({
        userID: cacheSessionKey.id,
        tel: tel,
      })
      const refreshToken = this.tokenService.createRefreshToken()

      await this.cacheSessionService.set(cacheSessionKey, refreshToken)

      return {
        accessToken,
        refreshToken,
      }
    }

    const oldAccessToken = arg1
    const userMarkers = arg2

    const decoded = this.tokenService.decodeAccessToken(oldAccessToken)

    if (!decoded) throw new ForbiddenException('Failed verify session.')

    const accessToken = this.tokenService.createAccessToken(decoded)
    const refreshToken = this.tokenService.createRefreshToken()

    const cacheSessionKey = {
      id: decoded.userID,
      ...userMarkers,
    }

    await this.cacheSessionService.set(cacheSessionKey, refreshToken)

    return {
      accessToken,
      refreshToken,
    }
  }

  async verify(
    accessToken: string,
    refreshToken: string,
    browser: string,
    os: string,
    ip: string
  ) {
    const decodedAccessToken = this.tokenService.decodeAccessToken(accessToken)

    if (decodedAccessToken === null) {
      throw new ForbiddenException('Failed verify session.')
    }

    const cacheSessionKey = {
      id: decodedAccessToken.userID,
      os,
      browser,
      ip,
    }

    const cacheSessionValue = await this.cacheSessionService.get(cacheSessionKey)

    if (cacheSessionValue === null || cacheSessionValue.refreshToken !== refreshToken) {
      throw new ForbiddenException('Failed verify session.')
    }
  }
}
