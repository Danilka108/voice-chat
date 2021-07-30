import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { StepperWrapperComponent } from './components/stepper-wrapper/stepper-wrapper.component'
import { StepperItemComponent } from './components/stepper-item/stepper-item.component'
import { StepperFieldComponent } from './components/stepper-field/stepper-field.component'
import { StepperBtnComponent } from './components/stepper-btn/stepper-btn.component'
import { MaterialModule } from '../material/material.module'

@NgModule({
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    StepperBtnComponent,
    StepperFieldComponent,
    StepperItemComponent,
    StepperWrapperComponent,
  ],
  exports: [StepperFieldComponent, StepperItemComponent, StepperWrapperComponent],
})
export class StepperModule {}
