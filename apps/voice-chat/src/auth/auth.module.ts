import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '../material/material.module'
import { routes } from './auth.routes'
import { AuthPageComponent } from './components/auth-page/auth-page.component'
import { HttpService } from './shared/http.service'
import { telCodesFactory, TEL_CODES } from './factories/tel-codes.factory'
import { authCodeLenFactory, AUTH_CODE_LEN } from './factories/auth-code-len.factory'
import { AuthEmojiComponent } from './components/auth-emoji/auth-emoji.component'
import { AuthHeaderComponent } from './components/auth-header/auth-header.component'
import { AuthSubHeaderComponent } from './components/auth-sub-header/auth-sub-header.component'
import { AuthTextComponent } from './components/auth-text/auth-text.component'
import { AuthStepNameComponent } from './components/auth-step-name/auth-step-name.component'
import { AuthStepCodeComponent } from './components/auth-step-code/auth-step-code.component'
import { AuthStepTelComponent } from './components/auth-step-tel/auth-step-tel.component'
import { AuthStepWelcomeComponent } from './components/auth-step-welcome/auth-step-welcome.component'
import { StepperModule } from '../stepper'

@NgModule({
  declarations: [
    AuthPageComponent,
    AuthEmojiComponent,
    AuthHeaderComponent,
    AuthSubHeaderComponent,
    AuthTextComponent,
    AuthStepNameComponent,
    AuthStepCodeComponent,
    AuthStepTelComponent,
    AuthStepWelcomeComponent,
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
  providers: [
    HttpService,
    {
      provide: TEL_CODES,
      useFactory: telCodesFactory,
    },
    {
      provide: AUTH_CODE_LEN,
      useFactory: authCodeLenFactory,
    },
  ],
})
export class AuthModule {}
