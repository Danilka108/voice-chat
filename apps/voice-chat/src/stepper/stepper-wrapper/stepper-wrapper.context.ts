import { Injectable } from '@angular/core'
import { Subject, BehaviorSubject } from 'rxjs'

@Injectable()
export class StepperWrapperContext {
  private readonly _prev$ = new Subject<void>()
  readonly prev$ = this._prev$.asObservable()

  private readonly _isHidenPrevBtn$ = new BehaviorSubject(true)
  readonly isHidenPrevBtn$ = this._isHidenPrevBtn$.asObservable()

  setIsHidenPrevBtn(isHidenPrevBtn: boolean) {
    this._isHidenPrevBtn$.next(isHidenPrevBtn)
  }

  toPrevStep() {
    this._prev$.next()
  }
}
