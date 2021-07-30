import { inject, Injectable, InjectFlags } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { getStepperFieldIsNotInStepperItemError } from '../stepper-errors'
import { StepperWrapperContainer } from './stepper-wrapper.container'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'any',
  useFactory: () => {
    const injected = inject(StepperItemContainer, InjectFlags.Optional)

    if (!injected) throw getStepperFieldIsNotInStepperItemError()

    return injected
  },
})
export class StepperItemContainer {
  form?: FormGroup
  heightPx?: number

  submit$ = new Subject<void>()

  index: number

  constructor(private readonly wrapperContainer: StepperWrapperContainer) {
    this.wrapperContainer.items.push(this)
    this.index = this.wrapperContainer.items.indexOf(this)
  }
}
