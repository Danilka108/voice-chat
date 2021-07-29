import { Component, Input } from '@angular/core'

@Component({
  selector: 'vc-stepper-btn',
  templateUrl: './stepper-btn.component.html',
  styleUrls: ['./stepper-btn.component.scss'],
})
export class StepperBtnComponent {
  @Input() disabled!: boolean
  @Input() loading!: boolean
}
