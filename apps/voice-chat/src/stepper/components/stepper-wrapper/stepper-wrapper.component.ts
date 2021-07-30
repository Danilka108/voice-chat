/* eslint-disable @angular-eslint/no-output-native */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'
import { tap } from 'rxjs/operators'
import { StepperWrapperController } from '../../controllers/stepper-wrapper.controller'
import { StepperWrapperContainer } from '../../containers/stepper-wrapper.container'

@Component({
  selector: 'vc-stepper-wrapper',
  templateUrl: './stepper-wrapper.component.html',
  styleUrls: ['./stepper-wrapper.component.scss'],
  providers: [StepperWrapperContainer, StepperWrapperController],
})
export class StepperWrapperComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly _sub = new Subscription()

  set subscription(sub: Subscription) {
    this._sub.add(sub)
  }
  get subscription() {
    return this._sub
  }

  formGroup!: FormGroup
  @Input() set FGroup(formGroup: FormGroup) {
    this.formGroup = formGroup
  }

  @Output() loading = new EventEmitter<boolean>()
  @Output() finish = new EventEmitter<void>()

  constructor(
    readonly wrapperController: StepperWrapperController,
    readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.wrapperController.initFormGroup(this.formGroup)

    this.subscription = this.wrapperController.loading$
      .pipe(tap((loading) => this.loading.emit(loading)))
      .subscribe()

    this.subscription = this.wrapperController.finish$
      .pipe(tap(() => this.finish.emit()))
      .subscribe()
  }

  ngAfterViewInit() {
    this.wrapperController.calculateHeight()
    this.changeDetector.detectChanges()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
