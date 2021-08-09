/* eslint-disable @angular-eslint/no-output-native */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Optional,
  Output,
} from '@angular/core'
import { FormGroup, FormGroupDirective, FormGroupName } from '@angular/forms'
import { merge, Subject, Subscription } from 'rxjs'
import { filter, map, tap } from 'rxjs/operators'
import { StepperContext } from '../../stepper-context'
import { WrapperContext } from '../../wrapper-context'

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
    @Optional() readonly wrapperContext: WrapperContext | null,
    readonly stepperContext: StepperContext,
    readonly changeDetector: ChangeDetectorRef,
    @Optional() readonly formGroupName: FormGroupName | null,
    @Optional() readonly formGroupDirective: FormGroupDirective | null
  ) {}

  getMaxHeightAmongItems() {
    const heights: number[] = []

    for (const item of this.stepperContext.steps) {
      if (item.heightPx) heights.push(item.heightPx)
    }

    return heights.length ? `${Math.ceil(Math.max(...heights))}px` : 'auto'
  }

  initFormGroup() {
    let formGroup: FormGroup | null = null

    if (this.formGroupName && this.formGroupName.control instanceof FormGroup) {
      formGroup = this.formGroupName.control
    } else if (this.formGroupDirective) {
      formGroup = this.formGroupDirective.form
    }

    this.stepperContext.form = formGroup
  }

  ngOnInit() {
    this.initFormGroup()

    if (this.wrapperContext) {
      this.subscription = this.wrapperContext.prevStep$
        .pipe(tap(() => (this.stepperContext.activeStepIndex += 1)))
        .subscribe()

      this.subscription = this.wrapperContext.nextStep$
        .pipe(tap(() => this.stepperContext.activeStep?.submit$.next()))
        .subscribe()
    }

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
