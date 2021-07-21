import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { FormControl, NgForm } from '@angular/forms'
import { BaseComponent } from '../../../core/shared/base-component'
import { tap } from 'rxjs/operators'
import { AUTH_FORM } from '../auth-form/auth-form.token'

@Component({
  selector: 'vc-auth-input',
  templateUrl: './auth-input.component.html',
  styleUrls: ['./auth-input.component.scss'],
  providers: [
    {
      provide: NgForm,
      useExisting: AUTH_FORM,
    },
  ],
})
export class AuthInputComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('input') inputRef!: ElementRef<HTMLElement>
  @Input() FControlName!: string
  @Input() label = ''
  @Input() type = 'text'
  @Output() inputEvent = new EventEmitter<Event>()

  formControl!: FormControl

  constructor(readonly ngForm: NgForm) {
    super()
  }

  ngOnInit(): void {
    const formGroup = this.ngForm.form
    this.formControl = formGroup.get(this.FControlName) as FormControl
  }

  ngAfterViewInit() {
    const input = this.inputRef.nativeElement
    this.subscription = this.ngForm.ngSubmit
      .pipe(
        tap(() => {
          console.log(this.FControlName, ' submit')
          input.blur()
        })
      )
      .subscribe()
  }
}
