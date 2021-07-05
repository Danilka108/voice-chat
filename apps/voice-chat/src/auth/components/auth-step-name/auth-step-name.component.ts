import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms'
import { AuthSteps } from '../../shared/enums'

@Component({
  selector: 'vc-auth-step-name',
  templateUrl: './auth-step-name.component.html',
  styleUrls: ['./auth-step-name.component.scss'],
})
export class AuthStepNameComponent implements OnInit {
  @Input() currentStep!: number
  @Output() stepChange = new EventEmitter<AuthSteps>()

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
    if (this.isBtnDisabled) return

    this.stepChange.emit(AuthSteps.Tel)
  }
}
