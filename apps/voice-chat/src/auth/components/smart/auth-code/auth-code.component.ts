import { Component, ElementRef, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthCodeController } from './auth-code.controller'
import { AUTH_CODE_CONTROLS, AuthCodeControls } from './controls.provider'
import { Steps } from '../../../steps.enum'

@Component({
  selector: 'vc-auth-code',
  templateUrl: './auth-code.component.html',
  styleUrls: ['./auth-code.component.scss', '../../../step.scss'],
  providers: [AuthCodeController],
})
export class AuthCodeComponent implements OnInit, OnDestroy {
  _sub = new Subscription()
  set subscription(sub: Subscription) {
    this._sub.add(sub)
  }
  get subscription() {
    return this._sub
  }

  @ViewChild('codeInputRef') codeInputRef!: ElementRef<HTMLInputElement>

  constructor(
    readonly controller: AuthCodeController,
    @Inject(AUTH_CODE_CONTROLS) readonly controls: typeof AuthCodeControls
  ) {}

  onSelected() {
    this.codeInputRef.nativeElement.focus()
  }

  ngOnInit() {
    this.subscription = this.controller.codeChanges$.subscribe()

    this.controller.addFormGroupToParent(Steps.Code)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
