import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthInitProfileController } from './auth-init-profile.controller'
import { AUTH_INIT_PROFILE_CONTROLS, AuthInitProfileControls } from './controls.provider'
import { Steps } from '../../../steps.enum'
import { UserConfig, USER_CONFIG } from '../../../../configs'

@Component({
  selector: 'vc-auth-init-profile',
  templateUrl: './auth-init-profile.component.html',
  styleUrls: ['./auth-init-profile.component.scss', '../../../step.scss'],
  providers: [AuthInitProfileController],
})
export class AuthInitProfileComponent implements OnInit, OnDestroy {
  private _sub = new Subscription()
  set subscription(sub: Subscription) {
    this._sub.add(sub)
  }
  get subscription() {
    return this._sub
  }

  @ViewChild('nameInputRef') nameInputRef!: ElementRef<HTMLElement>

  @Input() hide!: boolean

  constructor(
    readonly controller: AuthInitProfileController,
    @Inject(USER_CONFIG) readonly userConfig: UserConfig,
    @Inject(AUTH_INIT_PROFILE_CONTROLS) readonly controls: typeof AuthInitProfileControls
  ) {}

  onSelected() {
    this.nameInputRef.nativeElement.focus()
  }

  ngOnInit() {
    this.controller.addFormGroupToParent(Steps.InitProfile)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
