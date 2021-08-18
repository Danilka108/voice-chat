import { FormGroupDirective, FormGroup } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { of, pipe, Observable, UnaryFunction } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

export abstract class StepController {
  abstract formGroup: FormGroup

  constructor(
    private readonly matSnackBar: MatSnackBar,
    private readonly parentFormGroupDirective: FormGroupDirective
  ) {}

  protected mapApiRes<T>(): UnaryFunction<Observable<T | null>, Observable<boolean>> {
    return pipe(
      map((res) => res !== null),
      catchError((error) => {
        this.matSnackBar.open(error, 'ok', {
          duration: 2000,
        })

        return of(false)
      })
    )
  }

  addFormGroupToParent(controlName: string) {
    this.parentFormGroupDirective.form.addControl(controlName, this.formGroup)
  }

  getParentFormGroup() {
    return this.parentFormGroupDirective.form
  }
}
