import { Injectable, Inject } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FormGroupDirective, FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { of, Subject, Observable } from 'rxjs'
import { tap, switchMap } from 'rxjs/operators'
import { AuthApiService, UserDataService, StepController } from '../../../shared'
import { AuthCodeControls } from './controls.provider'
import { AuthTelControls } from '../auth-tel/controls.provider'
import { AUTH_CONFIG, AuthConfig } from '../../../../configs'
import { Steps } from '../../../steps.enum'
import { BindMethod } from '../../../../common'

@Injectable()
export class AuthCodeController extends StepController {
  readonly formGroup = this.fb.group({
    [AuthCodeControls.Code]: this.fb.control(null),
  })

  readonly codeChanges$ = (<Observable<number | null>>(
    this.formGroup.get(AuthCodeControls.Code)?.valueChanges
  )).pipe(tap(this.onCodeChange))

  private readonly _submit$ = new Subject<void>()
  readonly submit$ = this._submit$.asObservable().pipe(switchMap(this.switchToApi))
  private isDisabledSubmit = false

  constructor(
    @Inject(AUTH_CONFIG) private readonly authConfig: AuthConfig,
    private readonly userDataService: UserDataService,
    private readonly apiService: AuthApiService,
    private readonly fb: FormBuilder,
    matSnackBar: MatSnackBar,
    parentFormGroupDirective: FormGroupDirective
  ) {
    super(matSnackBar, parentFormGroupDirective)
  }

  @BindMethod()
  private switchToApi() {
    const tel = '+' + this.getTel().replace(/\D/g, '')
    const code = <number | null>this.formGroup.get(AuthCodeControls.Code)?.value

    if (!code || code.toString().length < this.authConfig.code.len) {
      return of(false)
    }

    return this.apiService.codeStep(tel, code).pipe(
      tap(() => (this.isDisabledSubmit = true)),
      tap(this.userDataService.setUserData),
      this.mapApiRes()
    )
  }

  @BindMethod()
  private onCodeChange(_value: number | null) {
    const control = <FormControl>this.formGroup.get(AuthCodeControls.Code)

    const slicedValue = _value ? _value.toString().slice(0, this.authConfig.code.len) : ''
    const parsedValue = parseInt(slicedValue)

    control.setValue(isNaN(parsedValue) ? null : parsedValue, {
      emitEvent: false,
    })

    if (!this.isDisabledSubmit && slicedValue.length === this.authConfig.code.len)
      this.submit()
  }

  getTel() {
    const parentFormGroup = this.getParentFormGroup()

    const telStepFormGroup = <FormGroup>parentFormGroup.get(Steps.Tel)

    const telCode = <string>(
      telStepFormGroup.get(AuthTelControls.TelCode)?.value.replace(/\D/g, '')
    )
    const telNumber = <string>(
      telStepFormGroup.get(AuthTelControls.TelNumber)?.value.replace(/\D/g, '')
    )

    return `+${telCode}${telNumber}`
  }

  submit() {
    this._submit$.next()
  }
}
