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
import { of, pipe, Subscription } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
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

  @Input() nextPipe = pipe(map(() => true))

  @Output() submit = new EventEmitter()
  @Output() selected = new EventEmitter()

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
  }

  getFormGroup() {
    let formGroup: FormGroup | null = null

    if (this.formGroupName && this.formGroupName.control instanceof FormGroup) {
      formGroup = this.formGroupName.control
    } else if (this.formGroupDirective) {
      formGroup = this.formGroupDirective.form
    }

    if (this.stepperContext.form === formGroup) formGroup = null

    return formGroup
  }

  ngOnInit() {
    this.subscription = this.stepContext.submit$
      .pipe(
        tap(() => {
          this.stepperContext.loading$.next(true)
          this.submit.emit()
        }),
        this.nextPipe,
        catchError(() => of(false)),
        tap((isNext) => {
          const formGroup = this.getFormGroup()

          if (isNext) this.stepperContext.activeStepIndex += 1

          if (isNext && formGroup) formGroup.disable()

          this.stepperContext.loading$.next(false)
        })
      )
      .subscribe()

    this.subscription = this.stepperContext.activeStepIndex$
      .pipe(
        tap((activeStepIndex) => {
          if (activeStepIndex === this.stepContext.index) {
            this.selected.emit()
          }
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
