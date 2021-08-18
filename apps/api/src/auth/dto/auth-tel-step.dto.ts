import { AuthTelStepReq } from '@voice-chat/api-interfaces'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { UserIdentificationDataDto } from './data/user-identification-data.dto'

export class AuthTelStepDto implements AuthTelStepReq {
  @IsNotEmpty()
  @IsString()
  tel!: string

  @ValidateNested()
  @Type(() => UserIdentificationDataDto)
  userIdentificationData!: UserIdentificationDataDto
}
