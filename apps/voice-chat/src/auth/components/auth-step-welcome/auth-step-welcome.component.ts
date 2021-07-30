import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { pipe } from 'rxjs'

@Component({
  selector: 'vc-auth-step-welcome',
  templateUrl: './auth-step-welcome.component.html',
  styleUrls: ['./auth-step-welcome.component.scss'],
})
export class AuthStepWelcomeComponent {
  formGroup = this.fb.group({})
  submitPipe = pipe()

  constructor(readonly fb: FormBuilder) {}
}
