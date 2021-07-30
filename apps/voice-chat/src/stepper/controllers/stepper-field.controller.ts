import { Injectable } from '@angular/core'
import { FormControl } from '@angular/forms'
import { StepperItemContainer } from '../containers/stepper-item.container'
import {
  getFormControlIsMissingInStepperItemFormGroupError,
  getInputsIsMissingInStepperFieldError,
  getStepperFieldIsNotInStepperItemError,
} from '../stepper-errors'

@Injectable()
export class StepperFieldController {
  constructor(private readonly itemContainer: StepperItemContainer) {}

  private formControl: FormControl | null = null

  initFormControl(formControl: FormControl, formControlName: string) {
    let _formControl = formControl

    if (!this.itemContainer.form) throw getStepperFieldIsNotInStepperItemError()

    if (_formControl && formControlName) {
      this.itemContainer.form.addControl(formControlName, _formControl)
    } else if (!_formControl && formControlName) {
      const control = this.itemContainer.form.get(formControlName)
      if (!(control instanceof FormControl))
        throw getFormControlIsMissingInStepperItemFormGroupError(formControlName)

      _formControl = control
    } else if (_formControl && !formControlName) {
      throw getInputsIsMissingInStepperFieldError('controlName')
    } else if (!_formControl && !formControlName) {
      throw getInputsIsMissingInStepperFieldError('control', 'controlName')
    }

    this.formControl = _formControl
    return _formControl
  }
}
