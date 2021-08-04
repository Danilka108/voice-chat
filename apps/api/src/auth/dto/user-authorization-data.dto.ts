import { UserAuthorizationData } from '@voice-chat/api-interfaces'
import { IsString } from 'class-validator'

export class UserAuthorizationDataDto implements UserAuthorizationData {
  @IsString()
  accessToken!: string

  @IsString()
  refreshToken!: string
}
