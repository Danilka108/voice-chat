import { Injectable } from '@angular/core'
import { FormGroup, FormGroupDirective } from '@angular/forms'
import { HttpRes } from '../common/types/http-res.type'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class StepController {
  constructor(
    private readonly matSnackBar: MatSnackBar,
    private readonly formGroupDirective: FormGroupDirective
  ) {
    this.parseRes = this.parseRes.bind(this)
  }

  addFormGroup(controlName: string, formGroup: FormGroup) {
    this.formGroupDirective.form.addControl(controlName, formGroup)
  }

  getParentFormGroup() {
    return this.formGroupDirective.form
  }

  parseRes<T>(res: HttpRes<T> | null) {
    if (!res) return false

    if (res.status === 'ERROR') {
      this.matSnackBar.open(res.message, 'ok', {
        duration: 2500,
      })
      return false
    }

    return true
  }
}
