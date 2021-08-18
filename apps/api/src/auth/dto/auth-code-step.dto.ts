import { AuthCodeStepReq } from '@voice-chat/api-interfaces'
import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { UserIdentificationDataDto } from './data/user-identification-data.dto'

export class AuthCodeStepDto implements AuthCodeStepReq {
  @IsNotEmpty()
  @IsString()
  tel!: string

  @IsNotEmpty()
  @IsInt()
  code!: number

  @ValidateNested()
  @Type(() => UserIdentificationDataDto)
  userIdentificationData!: UserIdentificationDataDto
}
