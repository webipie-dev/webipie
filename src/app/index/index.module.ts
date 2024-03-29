import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {AfterSigninComponent} from './after-signin/after-signin.component';
import {PricingComponent} from './pricing/pricing.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {TemplatesPageComponent} from './templates-page/templates-page.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {SpinnerModule} from '../spinner/spinner.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {IndexComponent} from './index.component';
import {IndexRoutingModule} from './index-routing.module';
import { LoadingSpinnerComponent } from '../_shared/loading-spinner/loading-spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MbscModule } from '@mobiscroll/angular';
import { GoogleLoginProvider, FacebookLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';



@NgModule({
    declarations: [
        IndexComponent,
        HeaderComponent,
        AfterSigninComponent,
        PricingComponent,
        SignInComponent,
        SignUpComponent,
        TemplatesPageComponent,
        LoadingSpinnerComponent,
    ],
    imports: [
        CommonModule,
        DragDropModule,
        SpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        HttpClientModule,
        IndexRoutingModule,
        NgxSpinnerModule,
        MbscModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        LoadingSpinnerComponent
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
      }
    ]
})
export class IndexModule { }
