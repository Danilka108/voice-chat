/* eslint-disable @angular-eslint/no-output-native */
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
} from '@angular/core'
import { FormGroup, FormGroupDirective, FormGroupName } from '@angular/forms'
import { from, Observable, of, Subscription } from 'rxjs'
import { catchError, switchMap, tap } from 'rxjs/operators'
import {
  changeStepAnimation,
  ChangeStepAnimStates,
} from '../../animations/change-step.animation'
import { StepContext } from '../../step-context'
import { StepperContext } from '../../stepper-context'

@Component({
  selector: 'vc-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  animations: [changeStepAnimation()],
  providers: [StepContext],
})
export class StepComponent implements OnInit, AfterViewInit, OnDestroy {
  _sub = new Subscription()

  set subscription(sub: Subscription) {
    this._sub.add(sub)
  }
  get subscription() {
    return this._sub
  }

  @Input() fixedHeight = false

  @Input() next$ = of<void>(undefined)

  @Output() submit = new EventEmitter()

  @HostBinding('@changeStepAnimation') get animState() {
    return this.stepperContext.activeStepIndex === this.stepContext.index
      ? ChangeStepAnimStates.Current
      : this.stepperContext.activeStepIndex > this.stepContext.index
      ? ChangeStepAnimStates.Prev
      : ChangeStepAnimStates.Next
  }

  constructor(
    readonly stepperContext: StepperContext,
    readonly stepContext: StepContext,
    readonly hostRef: ElementRef<HTMLFormElement>,
    @Optional() readonly formGroupDirective: FormGroupDirective | null,
    @Optional() readonly formGroupName: FormGroupName | null
  ) {}

  onFakeFormSubmit(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    this.stepContext.submit$.next()
    return false
  }

  getFormGroup() {
    if (this.formGroupName && this.formGroupName.control instanceof FormGroup) {
      return this.formGroupName.control
    } else if (this.formGroupDirective) {
      return this.formGroupDirective.form
    } else {
      return null
    }
  }

  ngOnInit() {
    this.subscription = this.stepContext.submit$
      .pipe(
        switchMap(() => {
          this.stepperContext.loading$.next(true)
          this.submit.emit()
          return this.next$
        }),
        catchError(() => of(undefined)),
        tap(() => {
          this.stepperContext.loading$.next(false)
          this.stepperContext.activeStepIndex += 1
        })
      )
      .subscribe()

    this.subscription = this.stepperContext.loading$
      .pipe(
        tap((isLoading) => {
          const formGroup = this.getFormGroup()

          if (!formGroup) return

          if (isLoading || this.animState === ChangeStepAnimStates.Prev)
            return formGroup.disable()

          formGroup.enable()
        })
      )
      .subscribe()

    this.stepContext.fixedHeight = this.fixedHeight
  }

  ngAfterViewInit() {
    this.stepContext.heightPx = this.hostRef.nativeElement.offsetHeight
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
