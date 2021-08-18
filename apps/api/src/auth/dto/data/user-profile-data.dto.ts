import { UserProfileData } from '@voice-chat/user-interfaces'
import { IsString, IsNotEmpty } from 'class-validator'

export class UserProfileDataDto implements UserProfileData {
  @IsNotEmpty()
  @IsString()
  name!: string
}
