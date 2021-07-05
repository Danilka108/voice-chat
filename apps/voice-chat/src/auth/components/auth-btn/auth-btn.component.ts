import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'vc-auth-btn',
  templateUrl: './auth-btn.component.html',
  styleUrls: ['./auth-btn.component.scss'],
})
export class AuthBtnComponent {
  @Input() disabled!: boolean
  @Input() secondary = false
  @Output() clickEvent = new EventEmitter<MouseEvent>()
}
