import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import {
  AuthCodeStepRes,
  AuthInitProfileStepRes,
  AuthRefreshSessionRes,
  AuthTelStepRes,
} from '@voice-chat/api-interfaces'
import { isUserAuthorizationData } from '@voice-chat/user-interfaces'
import { AuthService } from './shared/auth.service'
import {
  AuthTelStepDto,
  AuthCodeStepDto,
  AuthInitProfileStepDto,
  AuthRefreshSessionDto,
} from './dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('tel-step')
  async telStep(
    @Body() authTelStepDto: AuthTelStepDto
  ): Promise<AuthTelStepRes> {
    await this.authService.telStep(authTelStepDto)

    return {
      statusCode: HttpStatus.OK,
      message:
        'A code will be sent to the entered phone number. Use this code for sign in.',
      data: undefined,
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('code-step')
  async codeStep(
    @Body() authCodeStepDto: AuthCodeStepDto
  ): Promise<AuthCodeStepRes> {
    const result = await this.authService.codeStep(authCodeStepDto)

    const message = isUserAuthorizationData(result)
      ? 'Successful sign in.'
      : 'You need to init profile for sign in.'

    return {
      statusCode: HttpStatus.OK,
      message,
      data: result,
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('init-profile-step')
  async initProfileStep(
    @Body() authInitProfileStepDto: AuthInitProfileStepDto
  ): Promise<AuthInitProfileStepRes> {
    const result = await this.authService.initProfileStep(
      authInitProfileStepDto
    )

    return {
      statusCode: HttpStatus.OK,
      message: 'Successful sign in.',
      data: result,
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-session')
  async refreshToken(
    @Body() authRefreshSessionDto: AuthRefreshSessionDto
  ): Promise<AuthRefreshSessionRes> {
    const result = await this.authService.refreshSession(authRefreshSessionDto)

    return {
      statusCode: 200,
      message: 'Successful refresh session.',
      data: result,
    }
  }
}
