/* eslint-disable @angular-eslint/no-output-native */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { merge, Subject, Subscription } from 'rxjs'
import { filter, map, tap } from 'rxjs/operators'
import { StepperContext } from '../../stepper-context'

@Component({
  selector: 'vc-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [StepperContext],
})
export class StepperComponent implements OnInit, AfterViewInit, OnDestroy {
  _sub = new Subscription()

  set subscription(sub: Subscription) {
    this._sub.add(sub)
  }
  get subscription() {
    return this._sub
  }

  @Output() loading = new EventEmitter<boolean>()
  @Output() submit = new EventEmitter()

  calculateHeight$ = new Subject<void>()

  height$ = merge(this.stepperContext.activeStepIndex$, this.calculateHeight$).pipe(
    map(() => {
      if (this.stepperContext.activeStep?.fixedHeight) {
        return `${this.stepperContext.activeStep.heightPx}px`
      }

      return this.getMaxHeightAmongItems()
    })
  )

  constructor(
    readonly stepperContext: StepperContext,
    readonly changeDetector: ChangeDetectorRef
  ) {}

  getMaxHeightAmongItems() {
    const heights: number[] = []

    for (const item of this.stepperContext.steps) {
      if (item.heightPx) heights.push(item.heightPx)
    }

    return heights.length ? `${Math.ceil(heights.sort()[0])}px` : 'auto'
  }

  onNextStep() {
    this.stepperContext.activeStep?.submit$.next()
  }

  ngOnInit() {
    this.subscription = this.stepperContext.loading$
      .pipe(tap((loading) => this.loading.emit(loading)))
      .subscribe()

    this.subscription = this.stepperContext.activeStepIndex$
      .pipe(
        filter((step) => step >= this.stepperContext.steps.length),
        tap(() => this.submit.emit())
      )
      .subscribe()
  }

  ngAfterViewInit() {
    this.calculateHeight$.next()
    this.changeDetector.detectChanges()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
