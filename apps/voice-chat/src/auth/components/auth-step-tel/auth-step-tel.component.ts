import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core'
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms'
import { TEL_CODES } from '../../factories/tel-codes.factory'
import { AuthSteps } from '../../shared/enums'

@Component({
  selector: 'vc-auth-step-tel',
  templateUrl: './auth-step-tel.component.html',
  styleUrls: ['./auth-step-tel.component.scss'],
})
export class AuthStepTelComponent implements OnInit {
  @Input() loading!: boolean
  @Input() currentStep!: number
  @Output() stepChange = new EventEmitter<AuthSteps>()

  step!: number
  formGroup!: FormGroup
  isBtnDisabled = true

  constructor(
    @Inject(TEL_CODES) private readonly telCodes: string[],
    private controlContainer: ControlContainer,
    private fb: FormBuilder
  ) {
    this.step = AuthSteps.Tel
  }

  ngOnInit() {
    const parentFormGroup = this.controlContainer.control as FormGroup

    parentFormGroup.addControl(
      'tel-step',
      this.fb.group({
        tel: this.fb.control(null),
      })
    )

    this.formGroup = parentFormGroup.get('tel-step') as FormGroup
  }

  onInput() {
    let tel = this.formGroup.get('tel')?.value as null | string

    if (tel === null) return

    tel = tel.replace(/[^0-9]/g, '')
    if (!tel.match(/^\+.*/g) && tel.length) tel = '+' + tel

    this.isBtnDisabled = true

    for (let i = this.telCodes.length - 1; i >= 0; i--) {
      if (!tel.includes(this.telCodes[i])) continue

      let telPart = tel.slice(this.telCodes[i].length, tel.length)

      this.isBtnDisabled = telPart.length === 0

      let j = 0
      while (j < telPart.length) {
        if (j === 2 || j === 6) {
          telPart = telPart.slice(0, j + 1) + ' ' + telPart.slice(j + 1, telPart.length)
        }
        j++
      }

      tel = this.telCodes[i] + ' ' + telPart
      tel = tel.trim()
      break
    }

    this.formGroup.get('tel')?.setValue(tel)
  }

  onSubmit() {
    if (this.isBtnDisabled) return

    this.stepChange.next(AuthSteps.Code)
  }
}