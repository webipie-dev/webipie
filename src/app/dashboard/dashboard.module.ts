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


@NgModule({
  imports: [
    DashboardRoutingModule,
    HttpClientModule,
    Ng2SmartTableModule,

  ],
  declarations: [
    DashboardComponent,
    SideNavComponent,
    SalesComponent,
    SocialMediaComponent,
    OrdersComponent,
    MobileAppPageComponent,
    EditProductComponent,
    HeaderComponent,
  ],
})
export class DashboardModule {
}
