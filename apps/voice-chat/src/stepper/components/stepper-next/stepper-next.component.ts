import { Component, Input } from '@angular/core'

@Component({
  selector: 'vc-stepper-next',
  templateUrl: './stepper-next.component.html',
  styleUrls: ['./stepper-next.component.scss'],
})
export class StepperNextComponent {
  @Input() loading!: boolean | null
}
