import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { QuillModule } from 'ngx-quill' ;
import {DashboardComponent} from './dashboard.component';
import {SideNavComponent} from './side-nav/side-nav.component';
import {SalesComponent} from './sales/sales.component';
import {SocialMediaComponent} from './social-media/social-media.component';
import {OrdersComponent} from './sales/orders/orders.component';
import {MobileAppPageComponent} from './mobile-app-page/mobile-app-page.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ClientsComponent} from './sales/clients/clients.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProductsComponent} from './products/products.component';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {OrderDetailComponent} from './sales/orders/order-detail/order-detail.component';
import {ClientDetailComponent} from './sales/clients/client-detail/client-detail.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {StatisticsComponent} from './statistics/statistics.component';
import {NgImageSliderModule} from 'ng-image-slider';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from '../_shared/services/auth-guard.service';
import {HeaderComponent} from './header/header.component';
import {SpinnerModule} from "../spinner/spinner.module";
import {SidebarModule} from "ng-sidebar";
import { SideNavMinimizedComponent } from './side-nav-minimized/side-nav-minimized.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';


@NgModule({
  imports: [
    DashboardRoutingModule,
    HttpClientModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    CommonModule,
    NgxChartsModule,
    NgImageSliderModule,
    FormsModule,
    QuillModule.forRoot(),
    SpinnerModule,
    SidebarModule,
  ],
  declarations: [
    DashboardComponent,
    SideNavComponent,
    SalesComponent,
    SocialMediaComponent,
    OrdersComponent,
    MobileAppPageComponent,
    EditProductComponent,
    ClientsComponent,
    ProductsComponent,
    ProductDetailComponent,
    OrderDetailComponent,
    ClientDetailComponent,
    StatisticsComponent,
    ProfileComponent,
    HeaderComponent,
    SideNavMinimizedComponent,
    DashboardHomeComponent
  ],
  providers: [
    AuthGuard,
  ]
})
export class DashboardModule {
}
