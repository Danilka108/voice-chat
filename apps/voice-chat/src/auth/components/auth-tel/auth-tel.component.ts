import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core'
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms'
import { AuthTelStepState } from '../../types'
import { TEL_CODES } from '../../tel-codes'
import { AuthSteps, AuthStepStates } from '../../enums'

@Component({
  selector: 'vc-auth-tel',
  templateUrl: './auth-tel.component.html',
  styleUrls: ['./auth-tel.component.scss'],
})
export class AuthTelComponent implements OnInit {
  @Input() currentStep!: number
  @Output() stateChange = new EventEmitter<AuthTelStepState>()

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

  onChange() {
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
    this.stateChange.next({
      state: AuthStepStates.Tel,
      nextState: AuthStepStates.Code,
    })
  }

  // @Output() nextStep = new EventEmitter<void>()

  // form!: FormGroup
  // isLoading = false
  // isDisableBtn = true
  // errorMsg = ''

  // constructor(
  //   @Inject(TEL_CODES) private readonly telCodes: string[],
  //   private readonly httpService: HttpService,
  //   fb: FormBuilder
  // ) {
  //   super()
  //   this.form = fb.group({
  //     tel: new FormControl(null),
  //   })
  // }

  // onTelChange(): void {
  //   let tel = this.form.get('tel')?.value as null | string

  //   if (tel === null) return

  //   tel = tel.replace(/[^0-9]/g, '')
  //   if (!tel.match(/^\+.*/g) && tel.length) tel = '+' + tel

  //   this.isDisableBtn = true

  //   for (let i = this.telCodes.length - 1; i >= 0; i--) {
  //     if (!tel.includes(this.telCodes[i])) continue

  //     let telPart = tel.slice(this.telCodes[i].length, tel.length)

  //     this.isDisableBtn = telPart.length === 0

  //     let j = 0
  //     while (j < telPart.length) {
  //       if (j === 2 || j === 6) {
  //         telPart = telPart.slice(0, j + 1) + ' ' + telPart.slice(j + 1, telPart.length)
  //       }
  //       j++
  //     }

  //     tel = this.telCodes[i] + ' ' + telPart
  //     tel = tel.trim()
  //     break
  //   }

  //   this.form.get('tel')?.setValue(tel)
  // }

  // onSubmit() {
  //   let tel = this.form.get('tel')?.value as null | string

  //   if (tel === null) return

  //   tel = tel.replace(/[^0-9+]/g, '')

  //   if (!tel.match(/^\+[0-9]+/g)) return

  //   this.isLoading = true

  //   this.form.get('tel')?.setErrors(null)
  //   this.errorMsg = ''

  //   this.subscription = this.httpService
  //     .tel(tel)
  //     .pipe(
  //       map((res) => {
  //         if (res.status === 'OK') {
  //           this.nextStep.emit()
  //         } else {
  //           this.form.get('tel')?.setErrors({
  //             incorect: true,
  //           })
  //           this.errorMsg = res.message
  //         }

  //         this.isLoading = false
  //       })
  //     )
  //     .subscribe()
  // }

  // isErrorMsg(): boolean {
  //   return this.form.get('tel')?.hasError('incorect') || false
  // }
}
