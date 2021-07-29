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
import { getInputsIsMissingInStepperWRapperError } from '../../stepper-errors'
import { WrapperContainer } from './wrapper-container'

@Component({
  selector: 'vc-stepper-wrapper',
  templateUrl: './stepper-wrapper.component.html',
  styleUrls: ['./stepper-wrapper.component.scss'],
  providers: [WrapperContainer],
})
export class StepperWrapperComponent implements OnInit, AfterViewInit, OnDestroy {
  _sub = new Subscription()

  set subscription(sub: Subscription) {
    this._sub.add(sub)
  }
  get subscription() {
    return this._sub
  }

  @Input() group!: FormGroup

  @Output() finish = new EventEmitter<void>()

  height = 'auto'

  constructor(
    readonly wrapperContainer: WrapperContainer,
    readonly changeDetector: ChangeDetectorRef
  ) {}

  initForm() {
    if (!this.group) throw getInputsIsMissingInStepperWRapperError('group')
    this.wrapperContainer.form = this.group
  }

  calcHeight() {
    const heights: number[] = []

    for (const item of this.wrapperContainer.items) {
      if (item.heightPx) heights.push(item.heightPx)
    }

    if (heights.length) this.height = `${Math.ceil(heights.sort()[0])}px`
    this.changeDetector.detectChanges()
  }

  onBtnClick() {
    const activeItem = this.wrapperContainer.items[this.wrapperContainer.step]

    if (!activeItem) return

    activeItem.submit$.next()
  }

  ngOnInit() {
    this.initForm()

    this.subscription = this.wrapperContainer.step$
      .pipe(
        tap((step) => {
          if (step >= this.wrapperContainer.items.length) this.finish.emit()
        })
      )
      .subscribe()
  }

  ngAfterViewInit() {
    this.calcHeight()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
