import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { ControlContainer, FormGroup, NgForm } from '@angular/forms'
import { stepAnimation } from '../../animations/step.animation'
import { AuthContainer } from '../auth-container/auth-container'
import { AUTH_FORM } from './auth-form.token'

@Component({
  selector: 'vc-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  animations: [stepAnimation(100)],
  providers: [
    {
      provide: AUTH_FORM,
      useClass: NgForm,
    },
    {
      provide: NgForm,
      useExisting: AUTH_FORM,
    },
  ],
})
export class AuthFormComponent implements OnInit {
  @Input() FGroup!: FormGroup
  @Input() FGroupName!: string
  @Input() step!: number
  @Input() currentStep!: number

  @Output() submitEvent = new EventEmitter<any>()

  @ViewChild('form') formRef!: ElementRef<HTMLElement>

  @HostBinding('@stepAnimation')
  get getStepAnimation(): string {
    return this.currentStep === this.step
      ? 'current'
      : this.currentStep > this.step
      ? 'prev'
      : 'next'
  }

  constructor(
    readonly authContainer: AuthContainer,
    readonly controlContainer: ControlContainer,
    readonly ngForm: NgForm
  ) {}

  ngOnInit(): void {
    const parentFormGroup = this.controlContainer.control as FormGroup

    parentFormGroup.addControl(this.FGroupName, this.FGroup)

    this.ngForm.form = this.FGroup
  }

  onSubmit(event: any) {
    this.submitEvent.emit(event)
    this.ngForm.ngSubmit.emit(event)
  }
}
