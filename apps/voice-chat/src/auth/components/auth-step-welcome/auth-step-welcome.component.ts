import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { AuthSteps } from '../../shared/enums'

@Component({
  selector: 'vc-auth-step-welcome',
  templateUrl: './auth-step-welcome.component.html',
  styleUrls: ['./auth-step-welcome.component.scss'],
})
export class AuthStepWelcomeComponent {
  @Input() currentStep!: number
  @Output() stepChange = new EventEmitter<AuthSteps>()

  formGroup!: FormGroup
  step!: number

  constructor(fb: FormBuilder) {
    this.step = AuthSteps.Welcome
    this.formGroup = fb.group({})
  }

  onSignUp() {
    this.stepChange.emit(AuthSteps.Name)
  }

  onSignIn() {
    this.stepChange.emit(AuthSteps.Tel)
  }
}
