import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { LoginComponent } from './page/auth/login/login.component';
import { SingInComponent } from './page/auth/sing-in/sing-in.component';
import { SingUpComponent } from './page/auth/sing-up/sing-up.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SingInComponent,
    SingUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
