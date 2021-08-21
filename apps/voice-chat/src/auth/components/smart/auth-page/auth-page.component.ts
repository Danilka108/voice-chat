import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { UserDataService, LoadingService } from '../../../shared'

@Component({
  selector: 'vc-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
  formGroup = this.fb.group({})
  isLoading = false

  constructor(
    readonly loadingService: LoadingService,
    readonly loadingService2: LoadingService,
    readonly fb: FormBuilder,
    readonly userDataService: UserDataService
  ) {}

  onFinish() {
    const authData = this.userDataService.getUserAuthorizationData()
    console.log(authData)
  }
}
