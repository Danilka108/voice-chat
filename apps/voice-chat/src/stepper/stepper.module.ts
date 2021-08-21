import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MaterialModule } from '../material'
import { StepComponent } from './step'
import { StepperComponent } from './stepper'
import { StepperWrapperDirective } from './stepper-wrapper'
import { StepperNextDirective } from './stepper-next'
import { StepperPrevDirective } from './stepper-prev'

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [
    StepperComponent,
    StepComponent,
    StepperWrapperDirective,
    StepperNextDirective,
    StepperPrevDirective,
  ],
  exports: [
    StepperComponent,
    StepComponent,
    StepperWrapperDirective,
    StepperNextDirective,
    StepperPrevDirective,
  ],
})
export class StepperModule {}
