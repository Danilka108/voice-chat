import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { AppRoutingModule } from '../routing/app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from '../material/material.module'

@NgModule({
  declarations: [AppComponent],
  imports: [MaterialModule, BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
