import {
  Component,
  Output,
  OnInit,
  OnDestroy,
  EventEmitter,
  AfterViewInit,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { StepperController } from './stepper.controller'
import { StepperContext } from './stepper.context'
import { hideNextBtnAnim } from '../animations'

@Component({
  selector: 'vc-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [StepperController, StepperContext],
  animations: [hideNextBtnAnim()],
})
export class StepperComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly _sub = new Subscription()
  private set sub(sub: Subscription) {
    this._sub.add(sub)
  }
  private get sub() {
    return this._sub
  }

  get btnAnimState() {
    return this.controller.calcBtnAnimState()
  }

  @Output() finish = new EventEmitter<void>()

  constructor(readonly controller: StepperController) {}

  ngOnInit() {
    this.sub = this.controller.finish$.subscribe(() => this.finish.emit())
    this.sub = this.controller.prev$.subscribe(() => this.controller.toPrev())
    this.sub = this.controller.isHidenPrevBtn$.subscribe((isHiden) =>
      this.controller.setIsHidenPrevBtn(isHiden)
    )
  }

  ngAfterViewInit() {
    this.controller.initHeight()
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
