import { Directive, HostListener, OnInit, OnDestroy, HostBinding } from '@angular/core'
import { StepperWrapperContext } from '../stepper-wrapper'
import { Subscription } from 'rxjs'

@Directive({
  selector: '[vcStepperPrev]',
})
export class StepperPrevDirective implements OnInit, OnDestroy {
  private readonly _sub = new Subscription()
  set sub(sub: Subscription) {
    this._sub.add(sub)
  }
  get sub() {
    return this._sub
  }

  constructor(readonly stepperWrapperContext: StepperWrapperContext) {}

  @HostBinding('class.active') private active = false

  @HostListener('click')
  onClick() {
    this.stepperWrapperContext.toPrevStep()
  }

  ngOnInit() {
    this.sub = this.stepperWrapperContext.isHidenPrevBtn$.subscribe((isHiden) => {
      this.active = !isHiden
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
