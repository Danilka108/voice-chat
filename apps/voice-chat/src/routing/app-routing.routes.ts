import { Routes } from '@angular/router'
import { authPath } from './app-routing.constants'

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
  },
]
