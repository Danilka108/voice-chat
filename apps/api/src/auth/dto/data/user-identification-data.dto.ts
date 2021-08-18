import { UserIdentificationData } from '@voice-chat/user-interfaces'
import { IsNotEmpty, IsString } from 'class-validator'

export class UserIdentificationDataDto implements UserIdentificationData {
  @IsNotEmpty()
  @IsString()
  os!: string

  @IsNotEmpty()
  @IsString()
  browser!: string
}
