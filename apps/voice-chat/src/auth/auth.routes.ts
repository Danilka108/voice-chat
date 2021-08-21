import { Routes } from '@angular/router'
import { authPath } from '../routing'
import { AuthPageComponent } from './components'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: authPath.absolute,
  },
  {
    path: authPath.relative,
    component: AuthPageComponent,
  },
]
