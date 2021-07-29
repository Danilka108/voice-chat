import { FormGroup } from '@angular/forms'
import { Subject } from 'rxjs'

export class FormContainer {
  form: FormGroup | null = null
  readonly submit$ = new Subject<any>()
}
