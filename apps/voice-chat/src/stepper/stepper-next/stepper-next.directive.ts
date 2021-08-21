import { Directive, HostListener } from '@angular/core'
import { StepperContext } from '../stepper'

@Directive({
  selector: '[vcStepperNext]',
})
export class StepperNextDirective {
  constructor(readonly stepperContext: StepperContext) {}

  @HostListener('click')
  onClick() {
    this.stepperContext.activeStep.submit()
  }
}
