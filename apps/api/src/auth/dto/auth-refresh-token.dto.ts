import { AuthRefreshTokenReq } from '@voice-chat/api-interfaces'
import { IsString } from 'class-validator'

export class AuthRefreshTokenDto implements AuthRefreshTokenReq {
  @IsString()
  accessToken!: string

  @IsString()
  refreshToken!: string

  @IsString()
  os!: string

  @IsString()
  browser!: string
}
