import { UserAuthorizationData } from '@voice-chat/user-interfaces'
import { IsNotEmpty, IsString } from 'class-validator'

export class UserAuthorizationDataDto implements UserAuthorizationData {
  @IsNotEmpty()
  @IsString()
  accessToken!: string

  @IsNotEmpty()
  @IsString()
  refreshToken!: string
}
