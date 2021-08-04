import { UserIdentificationData } from '@voice-chat/api-interfaces'
import { IsString } from 'class-validator'

export class userIdentificationData implements UserIdentificationData {
  @IsString()
  os!: string

  @IsString()
  browser!: string
}
