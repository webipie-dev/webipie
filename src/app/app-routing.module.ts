import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfterSigninComponent } from './index/after-signin/after-signin.component';
import { IndexComponent } from './index/index.component';
import { SignUpComponent } from './index/sign-up/sign-up.component';
import {PageNotFoundComponent} from "./index/page-not-found/page-not-found.component";
import { SignInComponent } from './index/sign-in/sign-in.component';
import {TemplatesPageComponent} from './index/templates-page/templates-page.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'templates',
    component: TemplatesPageComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'signin',
    component: SignInComponent
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
    path: 'store',
    loadChildren: () => import('./store-edit/store-edit.module')
      .then(m => m.StoreEditModule),
  },
  {
    path: 'template',
    loadChildren: () => {
      const templateId = localStorage.getItem('templateId');
      return import('./template/template.module')
      .then(m => m.TemplateModule);
    },
  },
  {
    path: 'second-template',
    loadChildren: () => {
      return import('./second-template/second-template.module')
        .then(m => m.SecondTemplateModule);
    },
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
