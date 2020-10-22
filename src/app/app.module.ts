import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { PricingComponent } from './index/pricing/pricing.component';
import { HeaderComponent } from './index/header/header.component';
import { SignInComponent } from './index/sign-in/sign-in.component';
import { AfterSigninComponent } from './index/after-signin/after-signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from './dashboard/side-nav/side-nav.component';
import { SalesComponent } from './dashboard/sales/sales.component';
import { SocialMediaComponent } from './dashboard/social-media/social-media.component';
import { OrdersComponent } from './dashboard/sales/orders/orders.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { MobileAppPageComponent } from './dashboard/mobile-app-page/mobile-app-page.component';
import { EditProductComponent } from './dashboard/edit-product/edit-product.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PricingComponent,
    HeaderComponent,
    SignInComponent,
    AfterSigninComponent,
    DashboardComponent,
    SideNavComponent,
    SalesComponent,
    SocialMediaComponent,
    OrdersComponent,
    MobileAppPageComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
