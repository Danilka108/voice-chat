import { Injectable, ChangeDetectorRef } from '@angular/core'
import { StepperContext } from './stepper.context'
import { merge, Subject, BehaviorSubject, asyncScheduler } from 'rxjs'
import { map, observeOn } from 'rxjs/operators'
import { StepperWrapperContext } from '../stepper-wrapper'
import { HideNextBtnAnimStates } from '../animations'

@Injectable()
export class StepperController {
  private readonly initHeight$ = new Subject<void>()

  readonly height$ = merge(this.stepperContext.activeStepIndex$, this.initHeight$).pipe(
    map(() => this.calcHeight())
  )

  private readonly _transition$ = new BehaviorSubject<string>('')
  readonly transition$ = this._transition$.asObservable().pipe(observeOn(asyncScheduler))

  readonly prev$ = this.stepperWrapperContext.prev$

  readonly finish$ = this.stepperContext.finish$

  readonly isHidenPrevBtn$ = this.stepperContext.activeStepIndex$.pipe(
    map((index) => index <= 0 || index >= this.stepperContext.steps.length)
  )

  constructor(
    private readonly stepperContext: StepperContext,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly stepperWrapperContext: StepperWrapperContext
  ) {}

  calcBtnAnimState() {
    if (this.stepperContext.activeStepIndex < this.stepperContext.steps.length)
      return HideNextBtnAnimStates.Default
    return HideNextBtnAnimStates.Hiden
  }

  private calcHeight() {
    if (this.stepperContext.activeStep?.isFixedHeight) {
      return `${this.stepperContext.activeStep.heightPx}px`
    }

    const heights = this.stepperContext.steps.getHeightOfSteps()

    return heights.length ? `${Math.ceil(Math.max(...heights))}px` : 'auto'
  }

  setIsHidenPrevBtn(isHiden: boolean) {
    this.stepperWrapperContext.setIsHidenPrevBtn(isHiden)
  }

  initHeight() {
    this._transition$.next('height 250ms')
    this.initHeight$.next()
    this.changeDetectorRef.detectChanges()
  }

  toPrev() {
    this.stepperContext.activeStepIndex -= 1
  }
}
