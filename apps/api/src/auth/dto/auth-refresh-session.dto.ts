import { AuthRefreshSessionReq } from '@voice-chat/api-interfaces'
import { IsString } from 'class-validator'

export class AuthRefreshSessionDto implements AuthRefreshSessionReq {
  @IsString()
  accessToken!: string

  @IsString()
  refreshToken!: string

  @IsString()
  os!: string

  @IsString()
  browser!: string
}
