import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesComponent } from './dashboard/sales/sales.component';
import { SocialMediaComponent } from './dashboard/social-media/social-media.component';
import { AfterSigninComponent } from './index/after-signin/after-signin.component';
import { IndexComponent } from './index/index.component';
import { SignInComponent } from './index/sign-in/sign-in.component';
import {OrdersComponent} from './dashboard/sales/orders/orders.component';


const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: 'signIn',
    component: SignInComponent
  },
  {
    path: 'after-signIn',
    component: AfterSigninComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children:[
      {
        path: 'sales',
        component: SalesComponent
      },
      {
        path: 'sales/orders',
        component: OrdersComponent
      },
      {
        path: 'social-media',
        component: SocialMediaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
