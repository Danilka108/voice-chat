import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { merge, Subject } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { getInputsIsMissingInStepperWRapperError } from '../stepper-errors'
import { StepperWrapperContainer } from '../containers/stepper-wrapper.container'

@Injectable()
export class StepperWrapperController {
  readonly loading$ = this.wrapperContainer.loading$

  private readonly calculateHeight$ = new Subject()

  readonly height$ = merge(this.wrapperContainer.step$, this.calculateHeight$).pipe(
    map(() => {
      const step = this.wrapperContainer.step

      if (this.wrapperContainer.items[step]?.fixHeight) {
        const height = this.wrapperContainer.items[step].heightPx

        return height ? `${height}px` : 'auto'
      }

      return this.getMaxHeightAmongItems()
    })
  )

  readonly finish$ = this.wrapperContainer.step$.pipe(
    filter((step) => step >= this.wrapperContainer.items.length)
  )

  constructor(private readonly wrapperContainer: StepperWrapperContainer) {}

  private getMaxHeightAmongItems() {
    const heights: number[] = []

    for (const item of this.wrapperContainer.items) {
      if (item.heightPx) heights.push(item.heightPx)
    }

    return heights.length ? `${Math.ceil(heights.sort()[0])}px` : 'auto'
  }

  calculateHeight() {
    this.calculateHeight$.next()
  }

  initFormGroup(formGroup: FormGroup) {
    if (!formGroup) throw getInputsIsMissingInStepperWRapperError('group')
    this.wrapperContainer.form = formGroup
  }

  submit() {
    const activeItem = this.wrapperContainer.items[this.wrapperContainer.step]

    if (!activeItem) return

    activeItem.submit$.next()
  }
}
