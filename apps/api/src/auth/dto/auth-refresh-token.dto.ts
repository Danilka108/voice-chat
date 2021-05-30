import { AuthRefreshTokenReq } from '@voice-chat/api-interfaces'
import { IsInt, IsString } from 'class-validator'

export class AuthRefreshTokenDto implements AuthRefreshTokenReq {
  @IsInt()
  userID!: number

  @IsString()
  refreshToken!: string

  @IsString()
  os!: string

  @IsString()
  browser!: string
}
