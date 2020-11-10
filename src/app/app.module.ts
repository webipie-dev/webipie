import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { PricingComponent } from './index/pricing/pricing.component';
import { HeaderComponent } from './index/header/header.component';
import { SignUpComponent } from './index/sign-up/sign-up.component';
import { AfterSigninComponent } from './index/after-signin/after-signin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

import {DashboardModule} from "./dashboard/dashboard.module";
import { PageNotFoundComponent } from './index/page-not-found/page-not-found.component';
import {StoreEditModule} from "./store-edit/store-edit.module";
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { SignInComponent } from './index/sign-in/sign-in.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingSpinnerComponent } from './_shared/loading-spinner/loading-spinner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {TemplateModule} from './template/template.module';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PricingComponent,
    HeaderComponent,
    SignUpComponent,
    AfterSigninComponent,
    PageNotFoundComponent,
    SignInComponent,
    LoadingSpinnerComponent,
    // FormsModule
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    DashboardModule,
    StoreEditModule,
    TemplateModule,
    HttpClientModule,
    SocialLoginModule,
    NgxSpinnerModule,
    NgbModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '790108924491-t5da8keoe1srskluak4jpi4oue78gcai.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('348023999826107'),
          }
        ],
      } as SocialAuthServiceConfig,
    },

    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
