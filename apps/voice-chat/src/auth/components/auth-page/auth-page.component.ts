import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { BaseComponent } from '../../../core/shared/base-component'
import { map } from 'rxjs/operators'
import { AuthSteps } from '../../shared/enums'
import { HttpService } from '../../shared/http.service'

@Component({
  selector: 'vc-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent extends BaseComponent implements OnInit {
  formGroup!: FormGroup

  isTelLoading = false
  isCodeLoading = false
  step = 0

  constructor(
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private httpService: HttpService
  ) {
    super()
  }

  ngOnInit() {
    this.formGroup = this.fb.group({})
  }

  onStepChange(nextStep: AuthSteps) {
    if (nextStep === AuthSteps.Code) {
      this.formGroup.get('code-step')?.get('code')?.reset()
      this.onTelSubmit()
    } else if (nextStep == AuthSteps.Finish) {
      this.onCodeSubmit()
    } else {
      this.step = nextStep
    }
  }

  pushError(msg: string) {
    this.matSnackBar.open(msg, 'ok', {
      duration: 3000,
    })
  }

  onTelSubmit() {
    this.isTelLoading = true

    const tel = this.formGroup.get('tel-step')?.get('tel')?.value as null | string

    if (!tel) {
      this.pushError('Error. The phone number must be filled')
      return
    }

    this.subscription = this.httpService
      .tel(tel)
      .pipe(
        map((res) => {
          if (res.status === 'OK') {
            this.step = AuthSteps.Code
          } else {
            this.pushError(res.message)
          }

          this.isTelLoading = false
        })
      )
      .subscribe()
  }

  onCodeSubmit() {
    this.isCodeLoading = true

    const name = this.formGroup.get('name-step')?.get('name')?.value as null | string
    const tel = this.formGroup.get('tel-step')?.get('tel')?.value as null | string
    const code = this.formGroup.get('code-step')?.get('code')?.value as null | number

    if (!code) {
      this.pushError('Error. The auth code must be filled')
      return
    }

    if (!tel) {
      this.step = AuthSteps.Tel
      this.pushError('Error. The phone number must be filled')
      return
    }

    this.subscription = this.httpService
      .code(tel, code, name)
      .pipe(
        map((res) => {
          if (res.status === 'OK') {
            this.step = AuthSteps.Finish
          } else {
            this.pushError(res.message)
          }

          if (res.statusCode === 400) {
            this.step = AuthSteps.Name
            this.formGroup.get('code-step')?.get('code')?.reset()
          }

          this.isCodeLoading = false
        })
      )
      .subscribe()
  }
}
