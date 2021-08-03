import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthCodeReq, AuthCodeRes, AuthTelReq, AuthTelRes } from '@voice-chat/api-interfaces'
import { DeviceDetectorService } from 'ngx-device-detector'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { HttpRes, HttpResError, HttpResOK } from '../core/types/http-res.type'
import { environment } from '../environments/environment'

@Injectable()
export class HttpService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly deviceDetectorService: DeviceDetectorService
  ) {}

  private parseError(error: any): Observable<HttpResError> {
    const resErrorMessage = error.error.message

    const errorMessage =
      resErrorMessage && typeof resErrorMessage === 'string'
        ? resErrorMessage
        : 'Unexpected Error'

    return of({
      status: 'ERROR',
      statusCode: error?.status || null,
      message: errorMessage,
    })
  }

  tel(tel: string): Observable<HttpRes<AuthTelRes>> {
    const deviceInfo = this.deviceDetectorService.getDeviceInfo()

    const body: AuthTelReq = {
      tel,
      browser: deviceInfo.browser,
      os: `${deviceInfo.os}/${deviceInfo.os_version}`,
    }

    const req: Observable<HttpRes<AuthTelRes>> = this.httpClient
      .post<AuthTelRes>(`${environment.apiPath}/auth/tel`, body)
      .pipe(
        map(
          (data): HttpResOK<AuthTelRes> => ({
            status: 'OK',
            statusCode: data.statusCode,
            data,
          })
        ),
        catchError(this.parseError)
      )

    return req
  }

  code(tel: string, code: number, name: string | null) {
    const deviceInfo = this.deviceDetectorService.getDeviceInfo()

    const body: AuthCodeReq = {
      tel,
      code,
      browser: deviceInfo.browser,
      os: `${deviceInfo.os}/${deviceInfo.os_version}`,
      name: name ? name : '',
    }

    const req: Observable<HttpRes<AuthCodeRes>> = this.httpClient
      .post<AuthCodeRes>(`${environment.apiPath}/auth/code`, body)
      .pipe(
        map(
          (data): HttpResOK<AuthCodeRes> => ({
            status: 'OK',
            statusCode: data.statusCode,
            data: data,
          })
        ),
        catchError(this.parseError)
      )

    return req
  }
}
