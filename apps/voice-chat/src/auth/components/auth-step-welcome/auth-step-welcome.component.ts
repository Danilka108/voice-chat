import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AuthSteps } from '../../shared/enums'

@Component({
  selector: 'vc-auth-step-welcome',
  templateUrl: './auth-step-welcome.component.html',
  styleUrls: ['./auth-step-welcome.component.scss'],
})
export class AuthStepWelcomeComponent {
  @Input() currentStep!: number
  @Output() stepChange = new EventEmitter<AuthSteps>()

  step!: number

  constructor() {
    this.step = AuthSteps.Welcome
  }

  onSignUp() {
    this.stepChange.emit(AuthSteps.Name)
  }

  onSignIn() {
    this.stepChange.emit(AuthSteps.Tel)
  }
}
