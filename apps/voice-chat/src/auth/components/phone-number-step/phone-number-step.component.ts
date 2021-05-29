import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'vc-phone-number-step',
  templateUrl: './phone-number-step.component.html',
  styleUrls: ['./phone-number-step.component.scss'],
})
export class PhoneNumberStepComponent {
  form!: FormGroup

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      'phone-number': new FormControl(null),
    })
  }

  onPhoneNumberChange(): void {
    let value = this.form.get('phone-number')?.value as null | string

    if (value === null) return

    value = value.replace(/[^0-9]/g, '')

    if (!value.match(/^\+.*/g) && value.length) value = '+' + value

    let i = 0
    while (i < value.length) {
      if (i === 1 || i === 5 || i === 9 || i === 12) {
        value = value.slice(0, i + 1) + ' ' + value.slice(i + 1, value.length)
      }
      i++
    }

    value = value.trim()

    this.form.get('phone-number')?.setValue(value)
  }
}
