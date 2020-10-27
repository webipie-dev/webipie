import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfterSigninComponent } from './index/after-signin/after-signin.component';
import { IndexComponent } from './index/index.component';
import { SignUpComponent } from './index/sign-up/sign-up.component';
import {PageNotFoundComponent} from "./index/page-not-found/page-not-found.component";


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'after-signin',
    component: AfterSigninComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
      .then(m => m.DashboardModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
