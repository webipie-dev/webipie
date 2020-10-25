import {NgModule} from '@angular/core';

import {HttpClientModule} from "@angular/common/http";
import {DashboardComponent} from "./dashboard.component";
import {SideNavComponent} from "./side-nav/side-nav.component";
import {SalesComponent} from "./sales/sales.component";
import {SocialMediaComponent} from "./social-media/social-media.component";
import {OrdersComponent} from "./sales/orders/orders.component";
import {MobileAppPageComponent} from "./mobile-app-page/mobile-app-page.component";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import { HeaderComponent } from './header/header.component';
import { ClientsComponent } from './sales/clients/clients.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProductsComponent} from './products/products.component';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';


@NgModule({
    imports: [
        DashboardRoutingModule,
        HttpClientModule,
        Ng2SmartTableModule,
        ReactiveFormsModule,
        CommonModule,
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
      HeaderComponent
    ],
})
export class DashboardModule {
}
