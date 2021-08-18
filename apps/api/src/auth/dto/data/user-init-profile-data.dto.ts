import { UserInitProfileData } from '@voice-chat/user-interfaces'
import { IsNotEmpty, IsString } from 'class-validator'

export class UserInitProfileDataDto implements UserInitProfileData {
  @IsNotEmpty()
  @IsString()
  initProfileToken!: string
}
