import { Injectable } from '@angular/core'
import { DeviceDetectorService } from 'ngx-device-detector'
import {
  AuthCodeStepReq,
  AuthCodeStepRes,
  AuthTelStepReq,
  AuthTelStepRes,
  AuthInitProfileStepReq,
  AuthInitProfileStepRes,
  BaseRes,
} from '@voice-chat/api-interfaces'
import {
  UserIdentificationData,
  UserProfileData,
  UserInitProfileData,
} from '@voice-chat/user-interfaces'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { catchError, map, tap } from 'rxjs/operators'
import { Observable, pipe, UnaryFunction, throwError } from 'rxjs'
import { LoadingService } from './loading.service'

@Injectable()
export class AuthApiService {
  constructor(
    private readonly deviceDetecorService: DeviceDetectorService,
    private readonly httpClient: HttpClient,
    private readonly loadingService: LoadingService
  ) {}

  private mapRes<T>(): UnaryFunction<Observable<BaseRes<T>>, Observable<T>> {
    return pipe(
      map(({ data }): T => data),
      tap(() => (this.loadingService.loading = false)),
      catchError((error) => {
        this.loadingService.loading = false
        const errorMessage = error.error.message

        const newError = Error(
          errorMessage && typeof errorMessage === 'string' ? errorMessage : 'Unexpected Error'
        )

        return throwError(newError)
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

    this.loadingService.loading = true

    return this.httpClient
      .post<AuthTelStepRes>(`${environment.apiPath}/auth/tel-step`, body)
      .pipe(this.mapRes())
  }

  codeStep(tel: string, code: number) {
    const body: AuthCodeStepReq = {
      tel,
      code,
      userIdentificationData: this.getUserIdentificationData(),
    }

    this.loadingService.loading = true

    return this.httpClient
      .post<AuthCodeStepRes>(`${environment.apiPath}/auth/code-step`, body)
      .pipe(this.mapRes())
  }

  initProfileStep(
    tel: string,
    userProfileData: UserProfileData,
    userInitProfileData: UserInitProfileData
  ) {
    const body: AuthInitProfileStepReq = {
      tel,
      userProfileData,
      userInitProfileData,
      userIdentificationData: this.getUserIdentificationData(),
    }

    this.loadingService.loading = true

    return this.httpClient
      .post<AuthInitProfileStepRes>(`${environment.apiPath}/auth/init-profile-step`, body)
      .pipe(this.mapRes())
  }
}
