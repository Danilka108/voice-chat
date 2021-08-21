import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { StepperContext } from '../stepper'

@Injectable()
export class StepContext {
  private readonly _submitSubject$ = new Subject<void>()
  readonly submit$ = this._submitSubject$.asObservable()

  readonly index: number

  heightPx = 0
  isFixedHeight = false

  constructor(private readonly stepperContext: StepperContext) {
    this.index = this.stepperContext.steps.push(this)
  }

  submit() {
    this._submitSubject$.next()
  }
}
