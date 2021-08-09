import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { of, pipe } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { HttpService } from '../../http.service'
import { StepController } from '../../step.controller'

@Component({
  selector: 'vc-auth-code',
  templateUrl: './auth-code.component.html',
  styleUrls: ['./auth-code.component.scss', '../../step.scss'],
  providers: [StepController],
})
export class AuthCodeComponent implements OnInit {
  @ViewChild('codeInputRef') codeInputRef!: ElementRef<HTMLInputElement>

  formGroup = this.fb.group({
    code: this.fb.control(null),
  })

  nextPipe = pipe(
    switchMap(() => {
      const control = <FormControl>this.formGroup.get('code')

      setTimeout(() => {
        control.setErrors(null)
      })

      const tel = '+' + this.getTel().replace(/\D/g, '')
      const code = <number | null>control.value

      if (code) return this.httpService.codeStep(tel, code)

      setTimeout(() =>
        control.setErrors({
          required: true,
        })
      )

      return of(null)
    }),
    map(this.stepController.parseRes)
  )

  constructor(
    readonly fb: FormBuilder,
    readonly stepController: StepController,
    readonly httpService: HttpService
  ) {}

  onCodeInput() {
    const control = <FormControl>this.formGroup.get('code')
    const value = <number | null>this.formGroup.get('code')?.value

    const parsedValue = parseInt(`${value}`.replace(/\D/g, ''))

    control.setValue(isNaN(parsedValue) ? null : parsedValue)
  }

  getTel() {
    const telForm = <FormGroup>this.stepController.getParentFormGroup().get('tel-step')
    return (
      <string>telForm.get('tel-code')?.value + ' ' + <string>telForm.get('tel-number')?.value
    )
  }

  onSelected() {
    this.codeInputRef.nativeElement.focus()
  }

  hasErrors() {
    return this.formGroup.get('code')?.status === 'INVALID'
  }

  ngOnInit() {
    console.log(this.formGroup, this.stepController.getParentFormGroup())
    this.stepController.addFormGroup('code-step', this.formGroup)
  }
}
