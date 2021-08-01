import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { StepContext } from './step-context'

@Injectable()
export class StepperContext {
  readonly loading$ = new Subject<boolean>()

  private readonly _activeStepIndex$ = new BehaviorSubject(0)
  get activeStepIndex$() {
    return this._activeStepIndex$.asObservable()
  }
  get activeStepIndex() {
    return this._activeStepIndex$.getValue()
  }
  set activeStepIndex(stepIndex: number) {
    this._activeStepIndex$.next(stepIndex)
  }

  get activeStep() {
    return this.steps[this.activeStepIndex]
  }

  readonly steps: StepContext[] = []
}
