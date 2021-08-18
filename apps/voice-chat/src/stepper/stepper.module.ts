import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material'
import { StepComponent, StepperComponent } from './components'
import {
  StepperNextDirective,
  StepperPrevDirective,
  StepperWrapperDirective,
} from './directives'

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
