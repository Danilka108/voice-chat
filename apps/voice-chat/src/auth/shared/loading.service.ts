import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class LoadingService {
  private readonly _loading$ = new BehaviorSubject(false)
  readonly loading$ = this._loading$.asObservable()

  set loading(isLoading: boolean) {
    this._loading$.next(isLoading)
  }

  get loading() {
    return this._loading$.getValue()
  }
}
