import { AuthTelReq } from '@voice-chat/api-interfaces'
import { IsString } from 'class-validator'

export class AuthTelDto implements AuthTelReq {
  @IsString()
  tel!: string

  @IsString()
  browser!: string

  @IsString()
  os!: string
}
