import { AuthInitProfileReq, UserIdentificationData } from '@voice-chat/api-interfaces'
import { IsString, ValidateNested } from 'class-validator'

export class AuthInitProfileStepDto implements AuthInitProfileReq {
  @IsString()
  tel!: string

  @IsString()
  name!: string

  @IsString()
  initProfileToken!: string

  @ValidateNested()
  userIdentificationData!: UserIdentificationData
}
