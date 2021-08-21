import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { routes } from './routing.routes'

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
