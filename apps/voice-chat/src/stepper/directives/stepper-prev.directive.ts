import { Directive, HostListener } from '@angular/core'
import { WrapperContext } from '../wrapper-context'

@Directive({
  selector: 'button[vcStepperPrev]',
})
export class StepperPrevDirective {
  constructor(private readonly wrapperContext: WrapperContext) {}

  @HostListener('click')
  onClick() {
    this.wrapperContext.prevStep$.next()
  }
}
