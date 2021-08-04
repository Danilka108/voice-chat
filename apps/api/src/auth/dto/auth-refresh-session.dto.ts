import {
  AuthRefreshSessionReq,
  UserAuthorizationData,
  UserIdentificationData,
} from '@voice-chat/api-interfaces'
import { ValidateNested } from 'class-validator'

export class AuthRefreshSessionDto implements AuthRefreshSessionReq {
  @ValidateNested()
  userAuthorizationData!: UserAuthorizationData

  @ValidateNested()
  userIdentificationData!: UserIdentificationData
}
