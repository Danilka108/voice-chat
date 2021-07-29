import { ElementRef, inject, Injectable, InjectFlags } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Subject } from 'rxjs'
import { getStepperInputIsNotInStepperItemError } from '../../stepper-errors'
import { WrapperContainer } from '../stepper-wrapper/wrapper-container'

@Injectable({
  providedIn: 'any',
  useFactory: () => {
    const injected = inject(ItemContainer, InjectFlags.Optional)

    if (!injected) throw getStepperInputIsNotInStepperItemError()

    return injected
  },
})
export class ItemContainer {
  form?: FormGroup
  heightPx?: number

  readonly submit$ = new Subject<void>()

  readonly index: number

  constructor(
    private readonly wrapperContainer: WrapperContainer,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
    this.wrapperContainer.items.push(this)
    this.index = this.wrapperContainer.items.indexOf(this)
  }
}
