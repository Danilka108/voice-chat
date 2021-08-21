import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { Steps } from '../steps'

@Injectable()
export class StepperContext {
  private readonly _finish$ = new Subject<void>()
  readonly finish$ = this._finish$.asObservable()

  private readonly _activeStepIndex$ = new BehaviorSubject(0)
  set activeStepIndex(activeStepIndex: number) {
    if (activeStepIndex === this.steps.length) {
      this._finish$.next()
    }
    if (activeStepIndex >= 0 && activeStepIndex <= this.steps.length) {
      this._activeStepIndex$.next(activeStepIndex)
    }
  }
  get activeStepIndex() {
    return this._activeStepIndex$.getValue()
  }
  get activeStepIndex$() {
    return this._activeStepIndex$.asObservable()
  }

  get activeStep() {
    return this.steps.getByIndex(this.activeStepIndex)
  }

  readonly steps: Steps = new Steps()
}
