import { inject, Injectable, InjectFlags } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'
import { getStepperItemIsNotInStepperWrapperError } from '../../stepper-errors'
import { ItemContainer } from '../stepper-item/item-container'

@Injectable({
  providedIn: 'any',
  useFactory: () => {
    const injected = inject(WrapperContainer, InjectFlags.Optional)

    if (!injected) throw getStepperItemIsNotInStepperWrapperError()

    return injected
  },
})
export class WrapperContainer {
  form?: FormGroup
  loading = false

  private _step$ = new BehaviorSubject<number>(0)
  get step$() {
    return this._step$.asObservable()
  }

  get step() {
    return this._step$.getValue()
  }
  set step(step: number) {
    this._step$.next(step)
  }

  items: ItemContainer[] = []
}
