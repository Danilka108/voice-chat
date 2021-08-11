import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'
import { StepContext } from './step-context'

@Injectable()
export class StepperContext {
  private readonly _loading$ = new BehaviorSubject(false)
  set loading(isLoading: boolean) {
    this._loading$.next(isLoading)
  }
  get loading() {
    return this._loading$.getValue()
  }
  get loading$() {
    return this._loading$.asObservable()
  }

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

  form: FormGroup | null = null

  readonly steps: StepContext[] = []
}
