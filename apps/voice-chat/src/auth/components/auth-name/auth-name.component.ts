import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms'
import { AuthSteps, AuthStepStates } from '../../enums'
import { AuthNameStepState } from '../../types'

@Component({
  selector: 'vc-auth-name',
  templateUrl: './auth-name.component.html',
  styleUrls: ['./auth-name.component.scss'],
})
export class AuthNameComponent implements OnInit {
  @Input() currentStep!: number
  @Output() stateChange = new EventEmitter<AuthNameStepState>()

  step!: number
  formGroup!: FormGroup
  isBtnDisabled = true

  constructor(private controlContainer: ControlContainer, private fb: FormBuilder) {
    this.step = AuthSteps.Name
  }

  ngOnInit() {
    const parentFormGroup = <FormGroup>this.controlContainer.control

    parentFormGroup.addControl(
      'name-step',
      this.fb.group({
        name: this.fb.control(null),
      })
    )

    this.formGroup = parentFormGroup.get('name-step') as FormGroup
  }

  onInput() {
    const value = this.formGroup.get('name')?.value as string | null

    this.isBtnDisabled = !value
  }

  onSubmit() {
    this.stateChange.emit({
      state: AuthStepStates.Name,
      nextState: AuthStepStates.Tel,
    })
  }
}
