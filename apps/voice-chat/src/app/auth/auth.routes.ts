import { Routes } from '@angular/router'
import { authPath } from '../routing/app-routing.constants'
import { AuthPageComponent } from './components/auth-page/auth-page.component'

export const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: authPath.absolute,
  // },
  {
    path: '',
    component: AuthPageComponent,
  },
]
