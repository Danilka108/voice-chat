/* eslint-disable @angular-eslint/no-output-native */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { StepperFieldController } from '../../controllers/stepper-field.controller'

@Component({
  selector: 'vc-stepper-field',
  templateUrl: './stepper-field.component.html',
  styleUrls: ['./stepper-field.component.scss'],
  providers: [StepperFieldController],
})
export class StepperFieldComponent implements OnInit {
  @Input() type!: string
  @Input() placeholder!: string

  formControlName!: string
  @Input() set FControlName(controlName: string) {
    this.formControlName = controlName
  }

  formControl!: FormControl
  @Input() set FControl(formControl: FormControl) {
    this.formControl = formControl
  }

  @Output() input = new EventEmitter<Event>()

  constructor(readonly fieldController: StepperFieldController) {}

  ngOnInit() {
    this.formControl = this.fieldController.initFormControl(
      this.formControl,
      this.formControlName
    )
  }
}
