import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '../material/material.module'
import { routes } from './auth.routes'
import { AuthPageComponent } from './components/auth-page/auth-page.component'
import { StepperModule } from '../stepper'
import { AuthHeaderDirective } from './directives/auth-header.directive'
import { AuthTextDirective } from './directives/auth-text.directive'
import { AuthCaptionDirective } from './directives/auth-caption.directive'
import { AuthWelcomeComponent } from './components/auth-welcome/auth-welcome.component'
import { AuthTelComponent } from './components/auth-tel/auth-tel.component'
import { HttpService } from './http.service'
import { AuthCodeComponent } from './components/auth-code/auth-code.component'
import { AuthErrorComponent } from './components/auth-error/auth-error.component'

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
  providers: [HttpService],
})
export class AuthModule {}
