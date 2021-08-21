import { Directive } from '@angular/core'
import { StepperWrapperContext } from './stepper-wrapper.context'

@Directive({
  selector: '[vcStepperWrapper]',
  providers: [StepperWrapperContext],
})
export class StepperWrapperDirective {}
