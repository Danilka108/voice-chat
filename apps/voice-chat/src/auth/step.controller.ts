import { Injectable } from '@angular/core'
import { FormGroup, FormGroupDirective } from '@angular/forms'

@Injectable()
export class StepController {
  constructor(private readonly formGroupDirective: FormGroupDirective) {}

  addFormGroup(controlName: string, formGroup: FormGroup) {
    this.formGroupDirective.form.addControl(controlName, formGroup)
  }
}
