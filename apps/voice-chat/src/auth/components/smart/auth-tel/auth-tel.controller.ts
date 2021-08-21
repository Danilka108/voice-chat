import { Injectable } from '@angular/core'
import { FormBuilder, FormControl, FormGroupDirective } from '@angular/forms'
import { CountriesService, AuthApiService, StepController } from '../../../shared'
import { of, Observable, Subject, asyncScheduler } from 'rxjs'
import { observeOn, switchMap, tap } from 'rxjs/operators'
import { AuthTelControls } from './controls.provider'
import { MatSnackBar } from '@angular/material/snack-bar'
import { BindMethod } from '../../../../common'
import { Country } from '../../../providers'

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

  private readonly _submit$ = new Subject<void>()
  readonly submit$ = this._submit$
    .asObservable()
    .pipe(observeOn(asyncScheduler), switchMap(this.switchToApi))

  readonly telCodeSelectChanges$ = (<Observable<number>>(
    this.formGroup.get(AuthTelControls.TelCodeSelect)?.valueChanges
  )).pipe(tap(this.onTelCodeSelectChange))

  readonly telCodeChanges$ = (<Observable<string>>(
    this.formGroup.get(AuthTelControls.TelCode)?.valueChanges
  )).pipe(tap(this.onTelCodeChange))

  readonly telNumberChanges$ = (<Observable<string>>(
    this.formGroup.get(AuthTelControls.TelNumber)?.valueChanges
  )).pipe(tap(this.onTelNumberChange))

  private selectedCountry = this.countriesService.getDefaultCountry()
  readonly countries = this.countriesService.countries

  constructor(
    private readonly countriesService: CountriesService,
    private readonly fb: FormBuilder,
    private readonly apiService: AuthApiService,
    matSnackBar: MatSnackBar,
    parentFormGroupDirective: FormGroupDirective
  ) {
    super(matSnackBar, parentFormGroupDirective)
  }

  @BindMethod()
  private switchToApi() {
    const telNumberControl = <FormControl>this.formGroup.get(AuthTelControls.TelNumber)
    const telCodeControl = <FormControl>this.formGroup.get(AuthTelControls.TelCode)

    telNumberControl.setErrors(null)

    const telCode = <string>telCodeControl.value.replace(/\D/g, '')
    const telNumber = <string>telNumberControl.value.replace(/\D/g, '')

    const value = '+' + telCode + telNumber

    if (telNumber.length) return this.apiService.telStep(value).pipe(this.mapApiRes())

    telNumberControl.setErrors({
      invalidTelNumber: true,
    })

    return of(false)
  }

  @BindMethod()
  private onTelCodeSelectChange(telCodeSelectValue: number) {
    const nextCountry = this.countriesService.getCountryByIndex(telCodeSelectValue)

    const telCodeValue = '+' + (nextCountry?.telCode || '')

    this.formGroup.get(AuthTelControls.TelCode)?.setValue(telCodeValue, {
      emitEvent: false,
    })

    this.selectedCountry = nextCountry
  }

  @BindMethod()
  private onTelCodeChange(_telCodeValue: string) {
    const telCodeSelectControl = <FormControl>this.formGroup.get(AuthTelControls.TelCodeSelect)
    const telCodeControl = <FormControl>this.formGroup.get(AuthTelControls.TelCode)
    const telCodeValue = _telCodeValue.replace(/\D/g, '')
    const indexOfNextCountry = this.countriesService.getIndexOfCountryByKey(
      'telCode',
      telCodeValue
    )

    telCodeControl.setValue(`+${telCodeValue}`, {
      emitEvent: false,
    })
    telCodeSelectControl.setValue(indexOfNextCountry, {
      emitEvent: false,
    })

    this.selectedCountry = this.countriesService.getCountryByIndex(indexOfNextCountry)
  }

  @BindMethod()
  private onTelNumberChange(_value: string) {
    const control = <FormControl>this.formGroup.get(AuthTelControls.TelNumber)
    const value = _value.replace(/\D/g, '')

    const pattern = this.selectedCountry?.telPattern

    if (!pattern) {
      control.setValue(value, {
        emitEvent: false,
      })
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

  submit() {
    this._submit$.next()
  }

  trackBy(index: number, item: Country) {
    return this.countriesService.trackBy(index, item)
  }

  hasErrors() {
    return this.formGroup.get(AuthTelControls.TelNumber)?.status === 'INVALID'
  }
}
