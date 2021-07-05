import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ControlContainer, FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'vc-auth-input',
  templateUrl: './auth-input.component.html',
  styleUrls: ['./auth-input.component.scss'],
})
export class AuthInputComponent implements OnInit {
  @Input() controlName!: string
  @Input() label = ''
  @Input() type = 'text'
  @Output() inputEvent = new EventEmitter<Event>()

  formControl!: FormControl

  constructor(public controlContainer: ControlContainer) {}

  ngOnInit(): void {
    const parentFormGroup = this.controlContainer.control as FormGroup

    this.formControl = parentFormGroup.get(this.controlName) as FormControl
  }
}
