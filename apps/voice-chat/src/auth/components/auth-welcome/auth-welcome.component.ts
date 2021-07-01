import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AuthSteps, AuthStepStates } from '../../enums'
import { AuthWelcomeStepState } from '../../types'

@Component({
  selector: 'vc-auth-welcome',
  templateUrl: './auth-welcome.component.html',
  styleUrls: ['./auth-welcome.component.scss'],
})
export class AuthWelcomeComponent {
  @Input() currentStep!: number
  @Output() stateChange = new EventEmitter<AuthWelcomeStepState>()

  step!: number

  constructor() {
    this.step = AuthSteps.Welcome
  }

  onSignUp() {
    this.stateChange.next({
      state: AuthStepStates.Welcome,
      nextState: AuthStepStates.Name,
    })
  }

  onSignIn() {
    this.stateChange.next({
      state: AuthStepStates.Welcome,
      nextState: AuthStepStates.Tel,
    })
  }
}
