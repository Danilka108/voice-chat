import { ElementRef, Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { of, UnaryFunction } from 'rxjs'
import { catchError, filter, tap } from 'rxjs/operators'
import { StepperItemContainer } from '../containers/stepper-item.container'
import { StepperWrapperContainer } from '../containers/stepper-wrapper.container'
import {
  getFormGroupIsMissingInStepperWrapperFormGroupError,
  getInputsIsMissingInStepperItemError,
  getStepperItemIsNotInStepperWrapperError,
} from '../stepper-errors'

@Injectable()
export class StepperItemController {
  constructor(
    private readonly wrapperContainer: StepperWrapperContainer,
    private readonly itemContainer: StepperItemContainer,
    private readonly hostRef: ElementRef<HTMLElement>,
    private readonly matSnackBar: MatSnackBar
  ) {}

  private formGroup: FormGroup | null = null

  set fixHeight(isFixHeight: boolean) {
    this.itemContainer.fixHeight = isFixHeight
  }

  initFormGroup(formGroup: FormGroup, formGroupName: string) {
    let _formGroup = formGroup

    if (!this.wrapperContainer.form) {
      throw getStepperItemIsNotInStepperWrapperError()
    }

    if (!_formGroup && formGroupName) {
      const abstractControl = this.wrapperContainer.form.get(formGroupName)
      if (!(abstractControl instanceof FormGroup)) {
        throw getFormGroupIsMissingInStepperWrapperFormGroupError(formGroupName)
      }

      _formGroup = abstractControl
    } else if (_formGroup && formGroupName) {
      this.wrapperContainer.form.addControl(formGroupName, _formGroup)
    } else if (!_formGroup && !formGroupName) {
      throw getInputsIsMissingInStepperItemError('group', 'groupName')
    } else if (_formGroup && !formGroupName) {
      throw getInputsIsMissingInStepperItemError('groupName')
    }

    this.itemContainer.form = _formGroup
    this.formGroup = _formGroup
    return _formGroup
  }

  submit() {
    this.itemContainer.submit$.next()
  }

  getSubmit$(submitPipe: UnaryFunction<any, any>) {
    if (!submitPipe) throw getInputsIsMissingInStepperItemError('submitPipe')

    const formGroup = this.formGroup

    if (!formGroup) return of()

    return this.itemContainer.submit$.pipe(
      tap(() => {
        formGroup.markAllAsTouched()
      }),
      filter(() => !!this.formGroup?.valid && !this.wrapperContainer.loading),
      tap(() => {
        formGroup.disable()
        this.wrapperContainer.loading = true
      }),
      submitPipe,
      tap(() => {
        this.wrapperContainer.loading = false
        this.wrapperContainer.step = this.wrapperContainer.step + 1
      }),
      catchError(() => {
        formGroup.enable()
        return of()
      })
    )
  }

  calculateAnimationState() {
    return this.wrapperContainer.step === this.itemContainer.index
      ? 'current'
      : this.wrapperContainer.step > this.itemContainer.index
      ? 'prev'
      : 'next'
  }

  initHeight() {
    this.itemContainer.heightPx = this.hostRef.nativeElement.getBoundingClientRect().height
  }

  openSnackBar(message: string, action = 'ok', duration = 2500) {
    this.matSnackBar.open(message, action, {
      duration,
      horizontalPosition: 'left',
      verticalPosition: 'top',
    })
  }
}
