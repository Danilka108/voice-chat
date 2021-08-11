import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material/material.module'
import { StepComponent } from './components/step/step.component'
import { StepperComponent } from './components/stepper/stepper.component'
import { StepperWrapperDirective } from './directives/stepper-wrapper.directive'
import { StepperPrevDirective } from './directives/stepper-prev.directive'
import { StepperNextDirective } from './directives/stepper-next.directive'

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [
    StepperComponent,
    StepComponent,
    StepperWrapperDirective,
    StepperPrevDirective,
    StepperNextDirective,
  ],
  exports: [
    StepperComponent,
    StepComponent,
    StepperNextDirective,
    StepperPrevDirective,
    StepperWrapperDirective,
  ],
})
export class StepperModule {}
