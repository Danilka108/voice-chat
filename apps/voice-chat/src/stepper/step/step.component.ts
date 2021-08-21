import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  OnDestroy,
  HostBinding,
} from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { changeStepAnim } from '../animations'
import { StepController } from './step.controller'
import { StepContext } from './step.context'

@Component({
  selector: 'vc-step, [vcStep]',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  animations: [changeStepAnim()],
  providers: [StepController, StepContext],
})
export class StepComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly _sub = new Subscription()
  private set sub(sub: Subscription) {
    this._sub.add(sub)
  }
  private get sub() {
    return this._sub
  }

  @HostBinding('@changeStepAnimation') get animState() {
    return this.controller.calcAnimState()
  }

  @Input() hide: boolean | null = false
  @Input() fixedHeight = false
  @Input() set submit$(submit$: Observable<boolean>) {
    this.controller.submit$ = submit$
  }

  @Output() next = new EventEmitter<void>()
  @Output() selected = new EventEmitter<void>()

  constructor(readonly controller: StepController) {}

  ngOnInit() {
    this.sub = this.controller.selected$.subscribe(() => {
      setTimeout(() => {
        if (this.hide) this.controller.increaseStepIndex()
      })
      this.selected.emit()
    })

    this.sub = this.controller.submit$.subscribe(() => this.controller.increaseStepIndex())

    this.sub = this.controller.next$.subscribe(() => this.next.emit())

    this.controller.setIsFixedHeight(this.fixedHeight)
  }

  ngAfterViewInit() {
    this.controller.changeHeightPx()
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
