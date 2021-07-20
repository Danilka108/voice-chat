import { Body, Controller, HttpCode, HttpStatus, Ip, Post } from '@nestjs/common'
import { AuthCodeRes, AuthRefreshSessionRes } from '@voice-chat/api-interfaces'
import { AuthService } from './auth.service'
import { AuthCodeDto } from './dto/auth-code.dto'
import { AuthRefreshSessionDto } from './dto/auth-refresh-session.dto'
import { AuthTelDto } from './dto/auth-tel.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('tel')
  async tel(@Body() authTelDto: AuthTelDto, @Ip() ip: string) {
    await this.authService.tel(authTelDto, ip)

    return {
      statusCode: 200,
      message: 'A code will be sent to the entered phone number. Use this code for sign in.',
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('code')
  async code(@Body() authCodeDto: AuthCodeDto, @Ip() ip: string): Promise<AuthCodeRes> {
    const result = await this.authService.code(authCodeDto, ip)

    return {
      statusCode: 200,
      message: 'Successful sign in.',
      data: result,
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(
    @Body() authRefreshTokenDto: AuthRefreshSessionDto,
    @Ip() ip: string
  ): Promise<AuthRefreshSessionRes> {
    const result = await this.authService.refreshSession(authRefreshTokenDto, ip)

    return {
      statusCode: 200,
      message: 'Successful refresh token.',
      data: result,
    }
  }
}
