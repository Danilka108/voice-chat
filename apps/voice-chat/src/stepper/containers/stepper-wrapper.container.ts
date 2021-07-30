import { inject, Injectable, InjectFlags } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'
import { getStepperItemIsNotInStepperWrapperError } from '../stepper-errors'
import { StepperItemContainer } from './stepper-item.container'

@Injectable({
  providedIn: 'any',
  useFactory: () => {
    const injected = inject(StepperWrapperContainer, InjectFlags.Optional)

    if (!injected) throw getStepperItemIsNotInStepperWrapperError()

    return injected
  },
})
export class StepperWrapperContainer {
  form?: FormGroup

  private _loading$ = new BehaviorSubject(false)
  get loading$() {
    return this._loading$.asObservable()
  }

  get loading() {
    return this._loading$.getValue()
  }
  set loading(value: boolean) {
    this._loading$.next(value)
  }

  private _step$ = new BehaviorSubject(0)
  get step$() {
    return this._step$.asObservable()
  }

  get step() {
    return this._step$.getValue()
  }
  set step(value: number) {
    this._step$.next(value)
  }

  items: StepperItemContainer[] = []
}
