import { Injectable } from '@angular/core'
import { DeviceDetectorService } from 'ngx-device-detector'
import {
  AuthCodeStepReq,
  AuthCodeStepRes,
  AuthTelStepReq,
  AuthTelStepRes,
  BaseRes,
} from '@voice-chat/api-interfaces'
import { UserIdentificationData } from '@voice-chat/user-interfaces'
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'
import { catchError, map } from 'rxjs/operators'
import { Observable, pipe, UnaryFunction } from 'rxjs'

@Injectable()
export class AuthApiService {
  constructor(
    private readonly deviceDetecorService: DeviceDetectorService,
    private readonly httpClient: HttpClient
  ) {}

  private getResPipe<T>(): UnaryFunction<Observable<BaseRes<T>>, Observable<T>> {
    return pipe(
      map(({ data }): T => data),
      catchError((error) => {
        const errorMessage = error.error.message

        throw Error(
          errorMessage && typeof errorMessage === 'string' ? errorMessage : 'Unexpected Error'
        )
      })
    )
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
