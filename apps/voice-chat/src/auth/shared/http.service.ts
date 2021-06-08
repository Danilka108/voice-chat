import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthTelReq, AuthTelRes } from '@voice-chat/api-interfaces'
import { DeviceDetectorService } from 'ngx-device-detector'
import { Observable, of } from 'rxjs'
import { catchError, map, share } from 'rxjs/operators'
import { HttpRes, HttpResError, HttpResOK } from '../../core/types/http-res.type'
import { environment } from '../../environments/environment'

@Injectable()
export class HttpService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly deviceDetectorService: DeviceDetectorService
  ) {}
  tel(tel: string): Observable<HttpRes<AuthTelRes>> {
    const deviceInfo = this.deviceDetectorService.getDeviceInfo()

    const authTelReq: AuthTelReq = {
      tel,
      browser: deviceInfo.browser,
      os: `${deviceInfo.os}/${deviceInfo.os_version}`,
    }

    const result: Observable<HttpRes<AuthTelRes>> = this.httpClient
      .post<AuthTelRes>(`${environment.apiPath}/auth/tel`, authTelReq)
      .pipe(
        map(
          (data): HttpResOK<AuthTelRes> => ({
            status: 'OK',
            data,
          })
        ),
        catchError(
          (error): Observable<HttpResError> => {
            const resErrorMessage = error.error.message

            const errorMessage =
              resErrorMessage && typeof resErrorMessage === 'string'
                ? resErrorMessage
                : 'Unexpected Error'

            return of({
              status: 'ERROR',
              message: errorMessage,
            })
          }
        )
      )

    return result
  }
}
