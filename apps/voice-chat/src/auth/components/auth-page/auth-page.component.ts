import { Component } from '@angular/core'
import { stepAnimation } from '../../animations/step.animation'

@Component({
  selector: 'vc-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  animations: [stepAnimation(200)],
})
export class AuthPageComponent {
  step = 0

  increaseStep(): void {
    this.step++
  }
}
