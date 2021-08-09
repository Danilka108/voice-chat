import { Directive, HostListener } from '@angular/core'
import { WrapperContext } from '../wrapper-context'

@Directive({
  selector: 'button[vcStepperNext]',
})
export class StepperNextDirective {
  constructor(private readonly wrapperContext: WrapperContext) {}

  @HostListener('click')
  onClick() {
    this.wrapperContext.nextStep$.next()
  }
}
