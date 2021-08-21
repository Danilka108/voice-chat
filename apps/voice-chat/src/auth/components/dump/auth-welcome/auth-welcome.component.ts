import { Component } from '@angular/core'
import { Subject } from 'rxjs'

@Component({
  selector: 'vc-auth-welcome',
  templateUrl: './auth-welcome.component.html',
  styleUrls: ['./auth-welcome.component.scss'],
})
export class AuthWelcomeComponent {
  submit$ = new Subject<true>()
}
