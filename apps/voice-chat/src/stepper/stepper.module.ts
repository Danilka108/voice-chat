import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { StepperWrapperComponent } from './components/stepper-wrapper/stepper-wrapper.component'
import { StepperItemComponent } from './components/stepper-item/stepper-item.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { StepperInputComponent } from './components/stepper-input/stepper-input.component'
import { MatInputModule } from '@angular/material/input'
import { StepperBtnComponent } from './components/stepper-btn/stepper-btn.component'
import { MatButtonModule } from '@angular/material/button'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@NgModule({
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    StepperBtnComponent,
    StepperInputComponent,
    StepperItemComponent,
    StepperWrapperComponent,
  ],
  exports: [StepperInputComponent, StepperItemComponent, StepperWrapperComponent],
})
export class StepperModule {}
