/* eslint-disable @angular-eslint/no-output-native */
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Subscription } from 'rxjs'
import {
  getFormControlIsMissingInStepperItemFormGroupError,
  getInputsIsMissingInStepperInputError,
  getStepperInputIsNotInStepperItemError,
} from '../../stepper-errors'
import { ItemContainer } from '../stepper-item/item-container'

@Component({
  selector: 'vc-stepper-input',
  templateUrl: './stepper-input.component.html',
  styleUrls: ['./stepper-input.component.scss'],
})
export class StepperInputComponent implements OnInit, OnDestroy {
  _sub = new Subscription()

  set subscription(sub: Subscription) {
    this._sub.add(sub)
  }
  get subscription(): Subscription {
    return this._sub
  }

  @Input() type!: string
  @Input() label!: string
  @Input() controlName!: string
  @Input() control!: FormControl

  @Output() input = new EventEmitter<Event>()

  constructor(readonly itemContainer: ItemContainer) {}

  initControl() {
    if (!this.itemContainer.form) throw getStepperInputIsNotInStepperItemError()

    if (this.control && this.controlName) {
      this.itemContainer.form.addControl(this.controlName, this.control)
    } else if (!this.control && this.controlName) {
      const control = this.itemContainer.form.get(this.controlName)
      if (!(control instanceof FormControl))
        throw getFormControlIsMissingInStepperItemFormGroupError(this.controlName)

      this.control = control
    } else if (this.control && !this.controlName) {
      throw getInputsIsMissingInStepperInputError('controlName')
    } else if (!this.control && !this.controlName) {
      throw getInputsIsMissingInStepperInputError('control', 'controlName')
    }
  }

  ngOnInit() {
    this.initControl()
  }

  getError() {
    for (const key in this.control.errors) {
      return key
    }

    return ''
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
