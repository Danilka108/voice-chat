import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { randomInt } from 'crypto'

@Injectable()
export class SessionService {
  constructor(private readonly configService: ConfigService) {}

  createAuthCode(): number {
    const codeMax = this.configService.get<number>('auth.codeMax') ?? 0
    const code = randomInt(codeMax)

    return code
  }
}
