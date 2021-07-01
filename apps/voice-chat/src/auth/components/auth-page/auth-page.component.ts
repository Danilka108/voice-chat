import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { AuthSteps, AuthStepStates } from '../../enums'
import { AuthStepState } from '../../types'

@Component({
  selector: 'vc-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  formGroup!: FormGroup

  step = 0

  constructor(private fb: FormBuilder, private matSnackBar: MatSnackBar) {}

  ngOnInit() {
    this.formGroup = this.fb.group({})
  }

  onStateChange(event: AuthStepState) {
    this.step = AuthSteps[event.nextState]

    if (event.nextState === AuthStepStates.Code) {
      this.onTelSubmit()
    }
  }

  onTelSubmit() {
    const name = this.formGroup.get('name-step')?.get('name')?.value as null | string
    const tel = this.formGroup.get('tel-step')?.get('tel')?.value as null | string

    if (!tel) {
      this.step = AuthSteps.Name
      this.matSnackBar.open('Error. The phone number must be filled', 'ok', {
        duration: 3000,
      })
      return
    }
  }

  increaseStep(): void {
    this.step++
  }
}
