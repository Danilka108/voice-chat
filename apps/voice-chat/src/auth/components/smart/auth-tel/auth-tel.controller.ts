import { Injectable } from '@angular/core'
import { StepController } from '../../../step.controller'
import { FormBuilder, FormControl, FormGroupDirective } from '@angular/forms'
import { CountriesService, AuthApiService } from '../../../shared'
import { pipe, of, Observable, asyncScheduler } from 'rxjs'
import { tap, observeOn, switchMap } from 'rxjs/operators'
import { AuthTelControls } from './controls.provider'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class AuthTelController extends StepController {
  readonly formGroup = this.fb.group({
    [AuthTelControls.TelCodeSelect]: this.fb.control(
      this.countriesService.getIndexOfDefaultCountry()
    ),
    [AuthTelControls.TelCode]: this.fb.control(
      '+' + this.countriesService.getDefaultCountry()?.telCode || ''
    ),
    [AuthTelControls.TelNumber]: this.fb.control(''),
  })

  readonly nextPipe = pipe(
    observeOn(asyncScheduler),
    tap(() => this.formGroup.get(AuthTelControls.TelNumber)?.setErrors(null)),
    switchMap(() => {
      const telCode = <string>(
        this.formGroup.get(AuthTelControls.TelCode)?.value.replace(/\D/g, '')
      )
      const telNumber = <string>(
        this.formGroup.get(AuthTelControls.TelNumber)?.value.replace(/\D/g, '')
      )

      const value = '+' + telCode + telNumber

      return telNumber ? this.apiService.telStep(value) : of(null)
    }),
    tap(
      (res) =>
        !res &&
        this.formGroup.get(AuthTelControls.TelNumber)?.setErrors({
          invalidTelNumber: true,
        })
    ),
    this.mapApiRes()
  )

  readonly telCodeSelectChanges$ = (<Observable<number>>(
    this.formGroup.get(AuthTelControls.TelCodeSelect)?.valueChanges
  )).pipe(tap(this.onTelCodeSelectChange.bind(this)))

  readonly telCodeChanges$ = (<Observable<string>>(
    this.formGroup.get(AuthTelControls.TelCode)?.valueChanges
  )).pipe(tap(this.onTelCodeChange.bind(this)))

  readonly telNumberChanges$ = (<Observable<string>>(
    this.formGroup.get(AuthTelControls.TelCodeSelect)?.valueChanges
  )).pipe(tap(this.onTelNumberChange.bind(this)))

  private selectedCountry = this.countriesService.getDefaultCountry()

  readonly countries = this.countriesService.countries

  constructor(
    private readonly countriesService: CountriesService,
    private readonly stepController: StepController,
    private readonly fb: FormBuilder,
    private readonly apiService: AuthApiService,
    matSnackBar: MatSnackBar,
    parentFormGroupDirective: FormGroupDirective
  ) {
    super(matSnackBar, parentFormGroupDirective)
  }

  private onTelCodeSelectChange(telCodeSelectValue: number) {
    const nextCountry = this.countriesService.getCountryByIndex(telCodeSelectValue)
    const telCodeValue = '+' + (nextCountry?.telCode || '')

    this.formGroup.get(AuthTelControls.TelCode)?.setValue(telCodeValue, {
      emitEvent: false,
    })

    this.selectedCountry = nextCountry
  }

  private onTelCodeChange(_telCodeValue: string) {
    const telCodeSelectControl = <FormControl>this.formGroup.get(AuthTelControls.TelCodeSelect)
    const telCodeControl = <FormControl>this.formGroup.get(AuthTelControls.TelCode)
    const telCodeValue = _telCodeValue.replace(/\D/g, '')

    telCodeControl.setValue(`+${telCodeValue}`, {
      emitEvent: false,
    })

    const indexOfNextCountry = this.countriesService.getIndexOfCountryByKey(
      'telCode',
      telCodeValue
    )

    telCodeSelectControl.setValue(indexOfNextCountry)

    this.selectedCountry = this.countriesService.getCountryByIndex(indexOfNextCountry)
  }

  private onTelNumberChange(_value: string) {
    const control = <FormControl>this.formGroup.get(AuthTelControls.TelNumber)
    const value = _value.replace(/\D/g, '')

    const pattern = this.selectedCountry?.telPattern

    if (!pattern) {
      control.setValue(value)
      return
    }

    let newValue = ''
    for (let pI = 0, vI = 0; vI < value.length; pI++) {
      if (pattern[pI] === '-') {
        newValue += value[vI]
        vI++
        continue
      }

      if (pattern[pI] === ' ') {
        newValue += ' '
        continue
      }

      newValue += value[vI]
      vI++
    }

    control.setValue(newValue, {
      emitEvent: false,
    })
  }

  hasErrors() {
    return this.formGroup.get(AuthTelControls.TelNumber)?.status === 'INVALID'
  }
}
