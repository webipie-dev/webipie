import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { PricingComponent } from './index/pricing/pricing.component';
import { HeaderComponent } from './index/header/header.component';
import { SignInComponent } from './index/sign-in/sign-in.component';
import { AfterSigninComponent } from './index/after-signin/after-signin.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PricingComponent,
    HeaderComponent,
    SignInComponent,
    AfterSigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
