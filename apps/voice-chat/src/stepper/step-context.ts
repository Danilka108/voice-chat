import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { StepperContext } from './stepper-context'

@Injectable()
export class StepContext {
  readonly submit$ = new Subject<void>()

  readonly index: number
  heightPx = 0
  fixedHeight = false

  constructor(private readonly stepperContext: StepperContext) {
    this.stepperContext.steps.push(this)
    this.index = this.stepperContext.steps.length - 1
  }
}
