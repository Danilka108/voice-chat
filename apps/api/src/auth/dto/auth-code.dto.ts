import { AuthCodeReq } from '@voice-chat/api-interfaces'
import { IsInt, IsString } from 'class-validator'

export class AuthCodeDto implements AuthCodeReq {
  @IsString()
  tel!: string

  @IsInt()
  code!: number

  @IsString()
  browser!: string

  @IsString()
  os!: string

  @IsString()
  name!: string
}
