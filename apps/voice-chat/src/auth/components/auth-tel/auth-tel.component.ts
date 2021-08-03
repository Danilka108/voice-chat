import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import { COUNTRIES, Country } from '../../providers/countries.provider'
import { StepController } from '../../step.controller'

@Component({
  selector: 'vc-auth-tel',
  templateUrl: './auth-tel.component.html',
  styleUrls: ['./auth-tel.component.scss'],
  providers: [StepController],
})
export class AuthTelComponent implements OnInit {
  formGroup = this.fb.group({
    'tel-code': this.fb.control(
      '+' + this.countries.find((key) => key.name === 'United States')?.telCode || ''
    ),
    'tel-number': this.fb.control(''),
  })

  private selectedCountry = this.countries.find((key) => key.name === 'United States')

  get selectedCountryIndex() {
    return this.countries.findIndex((key) => key === this.selectedCountry)
  }
  set selectedCountryIndex(value: number) {
    this.selectedCountry = this.countries[value]
    this.formGroup.get('tel-code')?.setValue('+' + (this.countries[value]?.telCode || ''))
  }

  constructor(
    @Inject(COUNTRIES) readonly countries: Country[],
    readonly stepController: StepController,
    readonly fb: FormBuilder
  ) {}

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

    if (!pattern) return

    let newValue = ''

    for (let patternIndex = 0, valueIndex = 0; valueIndex < value.length; patternIndex++) {
      if (pattern[patternIndex] === '-') {
        newValue += value[valueIndex]
        valueIndex++
        continue
      }

      if (pattern[patternIndex] === ' ') {
        newValue += ' '
        continue
      }

      newValue += value[valueIndex]
      valueIndex++
    }

    control.setValue(newValue)
  }

  ngOnInit() {
    this.stepController.addFormGroup('tel-step', this.formGroup)
  }
}
