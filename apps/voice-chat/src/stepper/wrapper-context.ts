import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable()
export class WrapperContext {
  prevStep$ = new Subject<void>()
  nextStep$ = new Subject<void>()
}
