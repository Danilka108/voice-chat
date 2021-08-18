import { AuthInitProfileStepReq } from '@voice-chat/api-interfaces'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { UserIdentificationDataDto } from './data/user-identification-data.dto'
import { UserProfileDataDto } from './data/user-profile-data.dto'
import { UserInitProfileDataDto } from './data/user-init-profile-data.dto'

export class AuthInitProfileStepDto implements AuthInitProfileStepReq {
  @IsNotEmpty()
  @IsString()
  tel!: string

  @ValidateNested()
  @Type(() => UserProfileDataDto)
  userProfileData!: UserProfileDataDto

  @ValidateNested()
  @Type(() => UserInitProfileDataDto)
  userInitProfileData!: UserInitProfileDataDto

  @ValidateNested()
  @Type(() => UserIdentificationDataDto)
  userIdentificationData!: UserIdentificationDataDto
}
