/* eslint-disable @angular-eslint/no-output-native */
import { Component, Input, OnInit, HostBinding, OnDestroy, AfterViewInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { of, Subscription, UnaryFunction } from 'rxjs'
import { changeStepAnimation } from '../../animations/change-step.animation'
import { StepperItemController } from '../../controllers/stepper-item.controller'
import { StepperItemContainer } from '../../containers/stepper-item.container'
import { catchError } from 'rxjs/operators'

@Component({
  selector: 'vc-stepper-item',
  templateUrl: './stepper-item.component.html',
  styleUrls: ['./stepper-item.component.scss'],
  animations: [changeStepAnimation(200)],
  providers: [StepperItemContainer, StepperItemController],
})
export class StepperItemComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly _sub = new Subscription()

  set subscription(sub: Subscription) {
    this._sub.add(sub)
  }
  get subscription() {
    return this._sub
  }

  formGroupName!: string
  @Input() set FGroupName(formGroupName: string) {
    this.formGroupName = formGroupName
  }

  formGroup!: FormGroup
  @Input() set FGroup(formGroup: FormGroup) {
    this.formGroup = formGroup
  }

  @Input() submitPipe!: UnaryFunction<any, any>

  @HostBinding('@changeStepAnimation')
  get getStepAnimation() {
    return this.itemController.calculateAnimationState()
  }

  constructor(readonly itemController: StepperItemController) {}

  ngOnInit() {
    this.formGroup = this.itemController.initFormGroup(this.formGroup, this.formGroupName)

    this.subscription = this.itemController
      .getSubmit$(this.submitPipe)
      .pipe(
        catchError((error) => {
          if (typeof error === 'string') {
            this.itemController.openSnackBar(error)
          }

          return of()
        })
      )
      .subscribe()
  }

  ngAfterViewInit() {
    this.itemController.initHeight()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
