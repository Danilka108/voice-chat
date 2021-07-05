import { Component, Input } from '@angular/core'

@Component({
  selector: 'vc-auth-btn-loader',
  templateUrl: './auth-btn-loader.component.html',
  styleUrls: ['./auth-btn-loader.component.scss'],
})
export class AuthBtnLoaderComponent {
  @Input() loading!: boolean
  @Input() disabled!: boolean
}
