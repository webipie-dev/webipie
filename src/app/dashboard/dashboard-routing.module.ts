import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SalesComponent } from './sales/sales.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import {OrdersComponent} from './sales/orders/orders.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {ClientsComponent} from './sales/clients/clients.component';
import {ProductsComponent} from './products/products.component';
import { MobileAppPageComponent } from './mobile-app-page/mobile-app-page.component';
import {StatisticsComponent} from './statistics/statistics.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../_shared/services/auth-guard.service';
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    {
      path: '',
      component: DashboardHomeComponent,
      /*canActivate: [AuthGuard]*/
    },
    {
      path: 'social-media',
      component: SocialMediaComponent,
      /*canActivate: [AuthGuard]*/
    },
    {
      path: 'product-edit',
      component: EditProductComponent
    },
    {
      path: 'product-add',
      component: EditProductComponent
    },
    {
      path: 'products',
      component: ProductsComponent
    },
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: 'statistics',
      component: StatisticsComponent
    },
    {
      path: 'mobile-app',
      component: MobileAppPageComponent
    },
    {
      path: 'sales',
      children: [
        {
          path: '',
          component: SalesComponent,
          pathMatch: 'full',
        },
        {
          path: 'orders',
          component: OrdersComponent
        },
        {
          path: 'clients',
          component: ClientsComponent
        }
      ]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
