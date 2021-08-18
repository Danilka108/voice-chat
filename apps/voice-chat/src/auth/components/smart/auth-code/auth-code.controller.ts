import { StepController } from '../../../step.controller'
import { Injectable, EventEmitter, Inject } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FormGroupDirective, FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { pipe, of, Subject, Observable } from 'rxjs'
import { tap, switchMap } from 'rxjs/operators'
import { AuthApiService } from '../../../shared'
import { AuthCodeControls } from './controls.provider'
import { UserAuthorizationData, UserInitProfileData } from '@voice-chat/user-interfaces'
import { AuthTelControls } from '../auth-tel'
import { AUTH_CODE_LEN, AuthStepsControls } from '../../../providers'

@Injectable()
export class AuthCodeController extends StepController {
  formGroup = this.fb.group({})

  next = new EventEmitter<UserAuthorizationData | UserInitProfileData>()

  private readonly _submit$ = new Subject<void>()
  private isDisabledSubmit = false
  readonly submit$ = this._submit$.asObservable()

  readonly codeChanges$ = (<Observable<number | null>>(
    this.formGroup.get(AuthCodeControls.Code)?.valueChanges
  )).pipe(tap(this.onCodeChange.bind(this)))

  nextPipe = pipe(
    switchMap(() => {
      const tel = '+' + this.getTel().replace(/\D/g, '')
      const code = <number | null>this.formGroup.get(AuthCodeControls.Code)?.value

      return code && code.toString().length >= this.authCodeLen
        ? this.apiService.codeStep(tel, code)
        : of(null)
    }),
    tap((data) => data && this.next.emit(data)),
    this.mapApiRes()
  )

  constructor(
    @Inject(AUTH_CODE_LEN) private readonly authCodeLen: number,
    private readonly apiService: AuthApiService,
    private readonly fb: FormBuilder,
    matSnackBar: MatSnackBar,
    parentFormGroupDirective: FormGroupDirective
  ) {
    super(matSnackBar, parentFormGroupDirective)
  }

  private onCodeChange(_value: number | null) {
    const control = <FormControl>this.formGroup.get(AuthCodeControls.Code)

    const slicedValue = _value ? _value.toString().slice(0, this.authCodeLen) : ''
    const parsedValue = parseInt(slicedValue)

    control.setValue(isNaN(parsedValue) ? null : parsedValue, {
      emitEvent: false,
    })

    this.isDisabledSubmit = slicedValue.length === this.authCodeLen && !this.isDisabledSubmit
    if (this.isDisabledSubmit) this._submit$.next()
  }

  getTel() {
    const parentFormGroup = this.getParentFormGroup()

    const telStepFormGroup = <FormGroup>parentFormGroup.get(AuthStepsControls.TelStep)

    const telCode = <string>(
      telStepFormGroup.get(AuthTelControls.TelCode)?.value.replace(/\D/g, '')
    )
    const telNumber = <string>(
      telStepFormGroup.get(AuthTelControls.TelNumber)?.value.replace(/\D/g, '')
    )

    return `+${telCode}${telNumber}`
  }
}
