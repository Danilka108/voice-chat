import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import { COUNTRIES, Country } from '../../tokens/countries.token'
import { StepController } from '../../step.controller'
import { of, pipe } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { HttpService } from '../../http.service'

@Component({
  selector: 'vc-auth-tel',
  templateUrl: './auth-tel.component.html',
  styleUrls: ['./auth-tel.component.scss', '../../step.scss'],
  providers: [StepController],
})
export class AuthTelComponent implements OnInit {
  @ViewChild('telNumberRef') telNumberRef!: ElementRef<HTMLInputElement>

  formGroup = this.fb.group({
    'tel-code': this.fb.control('+' + this.getDefualtCountry()?.telCode || ''),
    'tel-number': this.fb.control(''),
  })

  private selectedCountry = this.getDefualtCountry()

  get selectedCountryIndex() {
    return this.countries.findIndex((key) => key === this.selectedCountry)
  }
  set selectedCountryIndex(value: number) {
    this.selectedCountry = this.countries[value]
    this.formGroup.get('tel-code')?.setValue('+' + (this.countries[value]?.telCode || ''))
  }

  nextPipe = pipe(
    switchMap(() => {
      setTimeout(() => {
        this.formGroup.get('tel-number')?.setErrors(null)
      })

      const telCode = <string>this.formGroup.get('tel-code')?.value.replace(/\D/g, '')
      const telNumber = <string>this.formGroup.get('tel-number')?.value.replace(/\D/g, '')

      const value = '+' + telCode + telNumber

      if (telNumber) {
        return this.httpService.telStep(value)
      }

      setTimeout(() =>
        this.formGroup.get('tel-number')?.setErrors({
          invalidTelNumber: true,
        })
      )

      return of(null)
    }),
    map(this.stepController.parseRes)
  )

  constructor(
    @Inject(COUNTRIES) readonly countries: Country[],
    readonly stepController: StepController,
    readonly fb: FormBuilder,
    readonly httpService: HttpService
  ) {}

  getDefualtCountry() {
    return this.countries.find((key) => key.name === 'United States')
  }

  onTelCodeInput() {
    const telCodeControl = <FormControl>this.formGroup.get('tel-code')
    const telCodeValue = <string>telCodeControl?.value.replace(/\D/g, '')

    telCodeControl.setValue('+' + telCodeValue)

    this.selectedCountry = this.countries.find((key) => key.telCode === telCodeValue)
  }

  onTelNumberInput() {
    const control = <FormControl>this.formGroup.get('tel-number')
    const value = <string>control.value.replace(/\D/g, '')

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

    control.setValue(newValue)
  }

  onSelected() {
    console.log('selected')
    this.telNumberRef.nativeElement.focus()
  }

  hasErrors() {
    return this.formGroup.get('tel-number')?.status === 'INVALID'
  }

  ngOnInit() {
    this.stepController.addFormGroup('tel-step', this.formGroup)
  }
}
