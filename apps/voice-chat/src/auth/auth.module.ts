import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '../material/material.module'
import { routes } from './auth.routes'
import { AuthPageComponent } from './components/auth-page/auth-page.component'
import { AuthStepComponent } from './components/auth-step/auth-step.component'
import { AuthTelStepComponent } from './components/auth-tel-step/auth-tel-step.component'
import { HttpService } from './shared/http.service'
import { telCodesFactory, TEL_CODES } from './tel-codes'

@NgModule({
  declarations: [AuthPageComponent, AuthTelStepComponent, AuthStepComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    HttpService,
    {
      provide: TEL_CODES,
      useFactory: telCodesFactory,
    },
  ],
})
export class AuthModule {}
