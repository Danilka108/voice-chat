import { AuthCodeReq, UserIdentificationData } from '@voice-chat/api-interfaces'
import { IsInt, IsString, ValidateNested } from 'class-validator'

export class AuthCodeStepDto implements AuthCodeReq {
  @IsString()
  tel!: string

  @IsInt()
  code!: number

  @ValidateNested()
  userIdentificationData!: UserIdentificationData
}
