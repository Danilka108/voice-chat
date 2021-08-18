import { Component, Input } from '@angular/core'

@Component({
  selector: 'vc-auth-error',
  templateUrl: './auth-error.component.html',
  styleUrls: ['./auth-error.component.scss'],
})
export class AuthErrorComponent {
  @Input() active!: boolean
}
