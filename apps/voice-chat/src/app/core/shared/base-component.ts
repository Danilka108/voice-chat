import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

@Component({
  selector: 'vc-base',
  template: '',
})
export class BaseComponent implements OnDestroy {
  subscriptions: Subscription = new Subscription()

  set subscription(sub: Subscription) {
    this.subscriptions.add(sub)
  }

  unsubscribe(): void {
    this.subscriptions.unsubscribe()
  }

  ngOnDestroy(): void {
    this.unsubscribe()
  }
}
