import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FormGroupDirective, FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { AuthInitProfileControls } from './controls.provider'
import { Subject, of, asyncScheduler } from 'rxjs'
import { switchMap, tap, map, observeOn } from 'rxjs/operators'
import { StepController, AuthApiService, UserDataService } from '../../../shared'
import { Steps } from '../../../steps.enum'
import { AuthTelControls } from '../auth-tel/controls.provider'
import { BindMethod } from '../../../../common'

@Injectable()
export class AuthInitProfileController extends StepController {
  readonly formGroup = this.fb.group({
    [AuthInitProfileControls.Name]: this.fb.control(''),
  })

  readonly isHide$ = this.userDataService
    .getUserInitProfileData$()
    .pipe(map((data) => data === null))

  private readonly _submit$ = new Subject<void>()
  readonly submit$ = this._submit$
    .asObservable()
    .pipe(observeOn(asyncScheduler), switchMap(this.switchToApi.bind(this)))

  constructor(
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
    const nameControl = <FormControl>this.formGroup.get(AuthInitProfileControls.Name)

    nameControl.setErrors(null)

    const name = nameControl.value
    const tel = this.getTel()
    const initProfileData = this.userDataService.getUserInitProfileData()

    if (!name || !tel || !initProfileData) {
      nameControl.setErrors({
        required: true,
      })

      return of(false)
    }

    return this.apiService
      .initProfileStep(tel, { name }, initProfileData)
      .pipe(tap(this.userDataService.setUserAuthorizationData), this.mapApiRes())
  }

  private getTel() {
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

  hasErrors() {
    return this.formGroup.get(AuthInitProfileControls.Name)?.status === 'INVALID'
  }
}
