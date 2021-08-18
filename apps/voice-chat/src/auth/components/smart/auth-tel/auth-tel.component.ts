import { Component, ElementRef, Inject, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthTelController } from './auth-tel.controller'
import { AuthTelControls, AUTH_TEL_CONTROLS } from './controls.provider'

@Component({
  selector: 'vc-auth-tel',
  templateUrl: './auth-tel.component.html',
  styleUrls: ['./auth-tel.component.scss', '../../../step.scss'],
  providers: [AuthTelController],
})
export class AuthTelComponent implements OnInit, OnDestroy {
  private _sub = new Subscription()
  set subscription(sub: Subscription) {
    this._sub.add(sub)
  }
  get subscription() {
    return this._sub
  }

  @ViewChild('telNumberRef') telNumberRef!: ElementRef<HTMLInputElement>

  constructor(
    @Inject(AUTH_TEL_CONTROLS) readonly controls: typeof AuthTelControls,
    readonly controller: AuthTelController
  ) {}

  onSelected() {
    this.telNumberRef.nativeElement.focus()
  }

  ngOnInit() {
    this.subscription = this.controller.telCodeSelectChanges$.subscribe()
    this.subscription = this.controller.telCodeChanges$.subscribe()
    this.subscription = this.controller.telNumberChanges$.subscribe()

    this.controller.addFormGroupToParent('tel-step')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
