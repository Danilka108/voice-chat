import { Component, HostBinding, Input } from '@angular/core'
import { stepAnimation } from '../../animations/step.animation'

@Component({
  selector: 'vc-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.scss'],
  animations: [stepAnimation(100)],
})
export class AuthWrapperComponent {
  @Input() step!: number
  @Input() currentStep!: number

  @HostBinding('@stepAnimation') get getStepAnimation(): string {
    return this.currentStep === this.step
      ? 'current'
      : this.currentStep > this.step
      ? 'prev'
      : 'next'
  }
}
