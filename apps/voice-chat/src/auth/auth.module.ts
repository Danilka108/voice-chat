import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '../material/material.module'
import { routes } from './auth.routes'
import { AuthPageComponent } from './components/auth-page/auth-page.component'
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component'
import { AuthTelComponent } from './components/auth-tel/auth-tel.component'
import { HttpService } from './shared/http.service'
import { telCodesFactory, TEL_CODES } from './tel-codes'
import { AuthWelcomeComponent } from './components/auth-welcome/auth-welcome.component'
import { AuthNameComponent } from './components/auth-name/auth-name.component'

@NgModule({
  declarations: [
    AuthPageComponent,
    AuthTelComponent,
    AuthWrapperComponent,
    AuthWelcomeComponent,
    AuthNameComponent,
  ],
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
