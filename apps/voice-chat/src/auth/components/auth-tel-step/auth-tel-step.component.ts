import { Component, EventEmitter, Inject, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { map } from 'rxjs/operators'
import { BaseComponent } from '../../../core/shared/base-component'
import { HttpService } from '../../shared/http.service'
import { TEL_CODES } from '../../tel-codes'

@Component({
  selector: 'vc-auth-tel-step',
  templateUrl: './auth-tel-step.component.html',
  styleUrls: ['./auth-tel-step.component.scss'],
})
export class AuthTelStepComponent extends BaseComponent {
  @Output() nextStep = new EventEmitter<void>()

  form!: FormGroup
  isLoading = false
  isDisableBtn = true
  errorMsg = ''

  constructor(
    @Inject(TEL_CODES) private readonly telCodes: string[],
    private readonly httpService: HttpService,
    fb: FormBuilder
  ) {
    super()
    this.form = fb.group({
      tel: new FormControl(null),
    })
  }

  onTelChange(): void {
    let tel = this.form.get('tel')?.value as null | string

    if (tel === null) return

    tel = tel.replace(/[^0-9]/g, '')
    if (!tel.match(/^\+.*/g) && tel.length) tel = '+' + tel

    this.isDisableBtn = true

    for (let i = this.telCodes.length - 1; i >= 0; i--) {
      if (!tel.includes(this.telCodes[i])) continue

      let telPart = tel.slice(this.telCodes[i].length, tel.length)

      this.isDisableBtn = telPart.length === 0

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

    this.form.get('tel')?.setValue(tel)
  }

  onSubmit() {
    let tel = this.form.get('tel')?.value as null | string

    if (tel === null) return

    tel = tel.replace(/[^0-9+]/g, '')

    if (!tel.match(/^\+[0-9]+/g)) return

    this.isLoading = true

    this.form.get('tel')?.setErrors(null)
    this.errorMsg = ''

    this.subscription = this.httpService
      .tel(tel)
      .pipe(
        map((res) => {
          if (res.status === 'OK') {
            this.nextStep.emit()
          } else {
            this.form.get('tel')?.setErrors({
              incorect: true,
            })
            this.errorMsg = res.message
          }

          this.isLoading = false
        })
      )
      .subscribe()
  }

  isErrorMsg(): boolean {
    return this.form.get('tel')?.hasError('incorect') || false
  }
}
