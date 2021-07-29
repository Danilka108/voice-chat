import { Component } from '@angular/core'
import { AuthContainer } from './auth-container'

@Component({
  selector: 'vc-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss'],
  providers: [
    {
      provide: AuthContainer,
      useClass: AuthContainer,
    },
  ],
})
export class AuthContainerComponent {
  constructor(readonly authContainer: AuthContainer) {}
}
