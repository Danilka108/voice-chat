import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { AuthSteps } from '../../shared/enums'

@Component({
  selector: 'vc-auth-step-name',
  templateUrl: './auth-step-name.component.html',
  styleUrls: ['./auth-step-name.component.scss'],
})
export class AuthStepNameComponent {
  @Input() currentStep!: number
  @Output() stepChange = new EventEmitter<AuthSteps>()

  step!: number
  formGroup!: FormGroup
  isBtnDisabled = true

  constructor(fb: FormBuilder) {
    this.step = AuthSteps.Name
    this.formGroup = fb.group({
      name: fb.control(null),
    })
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
