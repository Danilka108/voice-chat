import { Injectable } from '@angular/core'
import { DeviceDetectorService } from 'ngx-device-detector'
import {
  AuthCodeStepReq,
  AuthCodeStepRes,
  AuthTelStepReq,
  AuthTelStepRes,
  BaseRes,
  UserIdentificationData,
} from '@voice-chat/api-interfaces'
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'
import { catchError, map } from 'rxjs/operators'
import { Observable, of, pipe, UnaryFunction } from 'rxjs'
import { HttpRes, HttpResError } from '../common/types/http-res.type'

@Injectable()
export class HttpService {
  constructor(
    private readonly deviceDetecorService: DeviceDetectorService,
    private readonly httpClient: HttpClient
  ) {}

  private getResPipe<T>(): UnaryFunction<Observable<BaseRes<T>>, Observable<HttpRes<T>>> {
    return pipe(
      map(
        ({ message, data }): HttpRes<T> => ({
          status: 'OK',
          data,
          message,
        })
      ),
      catchError(this.parseError)
    )
  }

  private parseError(error: any): Observable<HttpResError> {
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

  private getUserIdentificationData(): UserIdentificationData {
    const deviceInfo = this.deviceDetecorService.getDeviceInfo()

    return {
      os: deviceInfo.os,
      browser: deviceInfo.browser,
    }
  }

  telStep(tel: string) {
    const body: AuthTelStepReq = {
      tel,
      userIdentificationData: this.getUserIdentificationData(),
    }

    return this.httpClient
      .post<AuthTelStepRes>(`${environment.apiPath}/auth/tel-step`, body)
      .pipe(this.getResPipe())
  }

  codeStep(tel: string, code: number) {
    const body: AuthCodeStepReq = {
      tel,
      code,
      userIdentificationData: this.getUserIdentificationData(),
    }

    return this.httpClient
      .post<AuthCodeStepRes>(`${environment.apiPath}/auth/code-step`, body)
      .pipe(this.getResPipe())
  }
}
