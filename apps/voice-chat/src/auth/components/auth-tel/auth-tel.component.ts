import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { StepController } from '../../step.controller'

@Component({
  selector: 'vc-auth-tel',
  templateUrl: './auth-tel.component.html',
  styleUrls: ['./auth-tel.component.scss'],
  providers: [StepController],
})
export class AuthTelComponent implements OnInit {
  formGroup = this.fb.group({
    'tel-code': this.fb.control('+1'),
    'tel-number': this.fb.control(''),
  })

  constructor(readonly stepController: StepController, readonly fb: FormBuilder) {}

  ngOnInit() {
    this.stepController.addFormGroup('tel-step', this.formGroup)
  }
}
