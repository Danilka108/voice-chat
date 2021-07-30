import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'
import { filter } from 'rxjs/operators'
import { getInputsIsMissingInStepperWRapperError } from '../stepper-errors'
import { StepperWrapperContainer } from '../containers/stepper-wrapper.container'

@Injectable()
export class StepperWrapperController {
  constructor(private readonly wrapperContainer: StepperWrapperContainer) {}

  readonly loading$ = this.wrapperContainer.loading$

  private readonly _height$ = new BehaviorSubject<string>('auto')
  readonly height$ = this._height$.asObservable()

  readonly finish$ = this.wrapperContainer.step$.pipe(
    filter((step) => step >= this.wrapperContainer.items.length)
  )

  initFormGroup(formGroup: FormGroup) {
    if (!formGroup) throw getInputsIsMissingInStepperWRapperError('group')
    this.wrapperContainer.form = formGroup
  }

  calculateHeight() {
    const heights: number[] = []

    for (const item of this.wrapperContainer.items) {
      if (item.heightPx) heights.push(item.heightPx)
    }

    this._height$.next(heights.length ? `${Math.ceil(heights.sort()[0])}px` : 'auto')
  }

  submit() {
    const activeItem = this.wrapperContainer.items[this.wrapperContainer.step]

    if (!activeItem) return

    activeItem.submit$.next()
  }
}
