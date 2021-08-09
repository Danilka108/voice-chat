import { Directive } from '@angular/core'
import { WrapperContext } from '../wrapper-context'

@Directive({
  selector: '[vcStepperWrapper]',
  providers: [WrapperContext],
})
export class StepperWrapperDirective {}
