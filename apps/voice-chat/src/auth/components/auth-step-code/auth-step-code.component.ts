/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Inject, Input, OnInit, Output } from '@angular/core'
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms'
import { EventEmitter } from '@angular/core'
import { AuthSteps } from '../../shared/enums'
import { AUTH_CODE_LEN } from '../../factories/auth-code-len.factory'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'vc-auth-step-code',
  templateUrl: './auth-step-code.component.html',
  styleUrls: ['./auth-step-code.component.scss'],
})
export class AuthStepCodeComponent implements OnInit {
  @Input() loading!: boolean
  @Input() currentStep!: number
  @Output() stepChange = new EventEmitter<AuthSteps>()

  isBtnDisabled = true
  step!: number
  formGroup!: FormGroup
  tel$!: Observable<string>

  constructor(
    @Inject(AUTH_CODE_LEN) private authCodeLen: number,
    private controlContainer: ControlContainer,
    private fb: FormBuilder
  ) {
    this.step = AuthSteps.Code
  }

  ngOnInit() {
    const parentFormGroup = this.controlContainer.control as FormGroup

    this.tel$ = parentFormGroup
      .get('tel-step')!
      .get('tel')!
      .valueChanges.pipe(
        map((v) => {
          const value = v as string | null

          return value ? value : ''
        })
      )

    parentFormGroup.addControl(
      'code-step',
      this.fb.group({
        code: this.fb.control(null),
      })
    )

    this.formGroup = parentFormGroup.get('code-step') as FormGroup
  }

  onInput() {
    const code = this.formGroup.get('code')?.value as number | null

    this.isBtnDisabled = !code || code.toString().length < this.authCodeLen

    const codeStr = code ? code.toString().slice(0, this.authCodeLen) : ''

    this.formGroup.get('code')?.setValue(parseInt(codeStr))
  }

  onChangeTel() {
    this.stepChange.next(AuthSteps.Tel)
  }

  onSubmit() {
    if (this.isBtnDisabled) return

    const code = this.formGroup.get('code')?.value as number | null

    if (code?.toString().length !== this.authCodeLen) return

    this.stepChange.next(AuthSteps.Finish)
  }
}