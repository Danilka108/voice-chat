import { Injectable } from '@angular/core'
import {
  UserAuthorizationData,
  UserInitProfileData,
  isUserAuthorizationData,
  isUserInitProfileData,
} from '@voice-chat/user-interfaces'
import { BindMethod } from '../../common'
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class UserDataService {
  private userAuthData = new BehaviorSubject<UserAuthorizationData | null>(null)
  private userInitProfileData = new BehaviorSubject<UserInitProfileData | null>(null)

  @BindMethod()
  setUserData(data: UserAuthorizationData | UserInitProfileData) {
    if (isUserAuthorizationData(data)) {
      this.setUserAuthorizationData(data)
      this.setUserInitProfileData(null)
      return
    }

    if (isUserInitProfileData(data)) {
      this.setUserAuthorizationData(null)
      this.setUserInitProfileData(data)
    }
  }

  @BindMethod()
  setUserAuthorizationData(data: UserAuthorizationData | null) {
    this.userAuthData.next(data)
  }

  @BindMethod()
  getUserAuthorizationData() {
    return this.userAuthData.getValue()
  }

  @BindMethod()
  setUserInitProfileData(data: UserInitProfileData | null) {
    this.userInitProfileData.next(data)
  }

  @BindMethod()
  getUserInitProfileData() {
    return this.userInitProfileData.getValue()
  }

  getUserInitProfileData$() {
    return this.userInitProfileData.asObservable()
  }
}
