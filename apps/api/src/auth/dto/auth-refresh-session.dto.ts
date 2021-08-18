import { AuthRefreshSessionReq } from '@voice-chat/api-interfaces'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { UserAuthorizationDataDto } from './data/user-authorization-data.dto'
import { UserIdentificationDataDto } from './data/user-identification-data.dto'

export class AuthRefreshSessionDto implements AuthRefreshSessionReq {
  @ValidateNested()
  @Type(() => UserAuthorizationDataDto)
  userAuthorizationData!: UserAuthorizationDataDto

  @ValidateNested()
  @Type(() => UserIdentificationDataDto)
  userIdentificationData!: UserIdentificationDataDto
}
