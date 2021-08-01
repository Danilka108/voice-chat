import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material/material.module'
import { StepComponent } from './components/step/step.component'
import { StepperNextComponent } from './components/stepper-next/stepper-next.component'
import { StepperComponent } from './components/stepper/stepper.component'

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [StepperComponent, StepComponent, StepperNextComponent],
  exports: [StepperComponent, StepComponent],
})
export class StepperModule {}
