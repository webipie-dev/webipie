import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SalesComponent } from './sales/sales.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import {OrdersComponent} from './sales/orders/orders.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {ClientsComponent} from './sales/clients/clients.component';


const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    {
      path: 'social-media',
      component: SocialMediaComponent
    },
    {
      path: 'product-edit',
      component: EditProductComponent
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
