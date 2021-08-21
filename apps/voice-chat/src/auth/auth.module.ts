import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '../material'
import { routes } from './auth.routes'
import { StepperModule } from '../stepper'
import { AuthHeaderDirective, AuthCaptionDirective, AuthTextDirective } from './directives'
import {
  AuthPageComponent,
  AuthWelcomeComponent,
  AuthCodeComponent,
  AuthErrorComponent,
  AuthTelComponent,
  AuthInitProfileComponent,
} from './components'
import { UserDataService, AuthApiService, CountriesService, LoadingService } from './shared'

@NgModule({
  declarations: [
    AuthPageComponent,
    AuthWelcomeComponent,
    AuthTelComponent,
    AuthHeaderDirective,
    AuthTextDirective,
    AuthCaptionDirective,
    AuthCodeComponent,
    AuthErrorComponent,
    AuthInitProfileComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    StepperModule,
  ],
  providers: [AuthApiService, CountriesService, UserDataService, LoadingService],
})
export class AuthModule {}
