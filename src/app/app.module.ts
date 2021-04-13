import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector, APP_INITIALIZER} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import {DashboardModule} from './dashboard/dashboard.module';
import {PageNotFoundComponent} from './index/page-not-found/page-not-found.component';
import {StoreEditModule} from './store-edit/store-edit.module';
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {QuillModule} from 'ngx-quill';
import {SecondTemplateModule} from './second-template/second-template.module';
import {SpinnerModule} from './spinner/spinner.module';
import {CommonModule} from '@angular/common';
import {ErrorInterceptor} from './error-interceptor';
import { SidebarModule } from 'ng-sidebar';
import {StoreService} from './_shared/services/store.service';
import {IndexModule} from './index/index.module';


export let InjectorInstance: Injector;

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    DashboardModule,
    StoreEditModule,
    HttpClientModule,
    SocialLoginModule,
    NgxSpinnerModule,
    NgbModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
        ]
      }
    }),
    SecondTemplateModule,
    SpinnerModule,
    SidebarModule.forRoot(),
    IndexModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (storeService: StoreService) => () => storeService.getStoreByUrl(),
      deps: [StoreService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
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

    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(private injector: Injector)
  {
    InjectorInstance = this.injector;
  }
}
