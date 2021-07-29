/* eslint-disable @angular-eslint/no-output-native */
import { Component, Input, OnInit, HostBinding, OnDestroy, ElementRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { of, Subject, Subscription, UnaryFunction } from 'rxjs'
import { catchError, filter, tap } from 'rxjs/operators'
import { changeStepAnimation } from '../../animations/change-step.animation'
import {
  getFormGroupIsMissingInStepperWrapperFormGroupError,
  getInputsIsMissingInStepperItemError,
  getStepperItemIsNotInStepperWrapperError,
} from '../../stepper-errors'
import { WrapperContainer } from '../stepper-wrapper/wrapper-container'
import { ItemContainer } from './item-container'

@Component({
  selector: 'vc-stepper-item',
  templateUrl: './stepper-item.component.html',
  styleUrls: ['./stepper-item.component.scss'],
  animations: [changeStepAnimation(200)],
  providers: [ItemContainer],
})
export class StepperItemComponent implements OnInit, OnDestroy {
  readonly _sub = new Subscription()

  set subscription(sub: Subscription) {
    this._sub.add(sub)
  }
  get subscription() {
    return this._sub
  }

  @Input() groupName!: string
  @Input() group!: FormGroup
  @Input() submitPipe!: UnaryFunction<any, any>

  @HostBinding('@changeStepAnimation')
  get getStepAnimation() {
    return this.wrapperContainer.step === this.itemContainer.index
      ? 'current'
      : this.wrapperContainer.step > this.itemContainer.index
      ? 'prev'
      : 'next'
  }

  submit$ = new Subject<any>()

  constructor(
    readonly itemContainer: ItemContainer,
    readonly wrapperContainer: WrapperContainer,
    readonly elementRef: ElementRef<HTMLElement>
  ) {}

  initForm() {
    if (!this.wrapperContainer.form) {
      throw getStepperItemIsNotInStepperWrapperError()
    }

    if (!this.group && this.groupName) {
      const formGroup = this.wrapperContainer.form.get(this.groupName)
      if (!(formGroup instanceof FormGroup)) {
        throw getFormGroupIsMissingInStepperWrapperFormGroupError(this.groupName)
      }

      this.itemContainer.form = formGroup
      this.group = formGroup
    } else if (this.group && this.groupName) {
      this.wrapperContainer.form.addControl(this.groupName, this.group)
      this.itemContainer.form = this.group
    } else if (!this.group && !this.groupName) {
      throw getInputsIsMissingInStepperItemError('group', 'groupName')
    } else if (this.group && !this.groupName) {
      throw getInputsIsMissingInStepperItemError('groupName')
    }
  }

  ngOnInit() {
    if (!this.submitPipe) {
      throw getInputsIsMissingInStepperItemError('submitPipe')
    }

    this.initForm()

    this.itemContainer.heightPx = this.elementRef.nativeElement.getBoundingClientRect().height

    this.subscription = this.itemContainer.submit$
      .pipe(
        tap(() => this.group.updateValueAndValidity()),
        filter(() => this.group.valid),
        tap(() => {
          this.group.disable()
          this.wrapperContainer.loading = true
        }),
        this.submitPipe,
        tap(() => {
          this.wrapperContainer.loading = false
          this.wrapperContainer.step = this.wrapperContainer.step + 1
          this.group.enable()
        }),
        catchError((_) => {
          this.group.enable()
          return of()
        })
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
