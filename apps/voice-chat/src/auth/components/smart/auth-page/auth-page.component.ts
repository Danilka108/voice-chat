import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { UserAuthorizationData, UserInitProfileData } from '@voice-chat/user-interfaces'

@Component({
  selector: 'vc-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
  formGroup = this.fb.group({})
  isLoading = false

  constructor(readonly fb: FormBuilder) {}

  onLoadingChange(isLoading: boolean) {
    this.isLoading = isLoading
  }

  onCodeStepNext(event: UserInitProfileData | UserAuthorizationData) {
    console.log(event)
  }
}
