import { AuthTelReq, UserIdentificationData } from '@voice-chat/api-interfaces'
import { IsString, ValidateNested } from 'class-validator'

export class AuthTelStepDto implements AuthTelReq {
  @IsString()
  tel!: string

  @ValidateNested()
  userIdentificationData!: UserIdentificationData
}
