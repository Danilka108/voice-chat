import { Injectable, ElementRef } from '@angular/core'
import { Observable, of } from 'rxjs'
import { filter, catchError } from 'rxjs/operators'
import { StepContext } from './step.context'
import { StepperContext } from '../stepper'
import { ChangeStepAnimStates } from '../animations'

@Injectable()
export class StepController {
  readonly next$ = this.stepContext.submit$

  readonly selected$ = this.stepperContext.activeStepIndex$.pipe(
    filter((index) => index === this.stepContext.index)
  )

  private _submit$: Observable<boolean> = of()

  set submit$(submit$: Observable<boolean>) {
    this._submit$ = submit$
  }
  get submit$() {
    return this._submit$.pipe(
      catchError(() => of(false)),
      filter((isNext) => isNext)
    )
  }

  constructor(
    private readonly stepperContext: StepperContext,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly stepContext: StepContext
  ) {}

  setIsFixedHeight(isFixedHeight: boolean) {
    this.stepContext.isFixedHeight = isFixedHeight
  }

  changeHeightPx() {
    this.stepContext.heightPx = this.elementRef.nativeElement.getBoundingClientRect().height
  }

  calcAnimState() {
    return this.stepperContext.activeStepIndex === this.stepContext.index
      ? ChangeStepAnimStates.Current
      : this.stepperContext.activeStepIndex > this.stepContext.index
      ? ChangeStepAnimStates.Prev
      : ChangeStepAnimStates.Next
  }

  increaseStepIndex() {
    this.stepperContext.activeStepIndex += 1
  }
}
