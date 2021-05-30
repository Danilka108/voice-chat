import { AuthCodeReq } from '@voice-chat/api-interfaces'
import { IsInt, IsString } from 'class-validator'

export class AuthCodeDto implements AuthCodeReq {
  @IsInt()
  code!: number

  @IsString()
  browser!: string

  @IsString()
  os!: string
}