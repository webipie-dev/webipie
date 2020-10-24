import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfterSigninComponent } from './index/after-signin/after-signin.component';
import { IndexComponent } from './index/index.component';
import { SignInComponent } from './index/sign-in/sign-in.component';
import {PageNotFoundComponent} from "./index/page-not-found/page-not-found.component";


const routes: Routes = [
  {
    path: '',
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
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
      .then(m => m.DashboardModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
