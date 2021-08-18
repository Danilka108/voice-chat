import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core'
import { UserAuthorizationData } from '@voice-chat/user-interfaces'
import { StepController } from '../../../step.controller'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { pipe, Observable, Subscription, asyncScheduler } from 'rxjs'
import { tap, map, switchMap, observeOn } from 'rxjs/operators'

@Component({
  selector: 'vc-auth-init-profile',
  templateUrl: './auth-init-profile.component.html',
  styleUrls: ['./auth-init-profile.component.scss', '../../../step.scss'],
  providers: [StepController],
})
export class AuthInitProfileComponent implements OnInit, OnDestroy {
  private _sub = new Subscription()
  set subscription(sub: Subscription) {
    this._sub.add(sub)
  }
  get subscription() {
    return this._sub
  }

  @Input() hide!: boolean

  @Output() next = new EventEmitter<UserAuthorizationData>()

  formGroup = this.fb.group({
    name: this.fb.control(''),
  })

  nextPipe = pipe(
    observeOn(asyncScheduler),
    tap(() => this.formGroup.get('name')?.setErrors(null))
  )

  constructor(readonly stepController: StepController, readonly fb: FormBuilder) {}

  onNameValueChange(_value: string) {}

  ngOnInit() {
    this.subscription = (<Observable<string>>this.formGroup.get('name')?.valueChanges)
      .pipe(map((value) => this.onNameValueChange(value)))
      .subscribe()

    this.stepController.addFormGroup('init-profile-step', this.formGroup)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
