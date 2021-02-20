import {Injectable, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfterSigninComponent } from './index/after-signin/after-signin.component';
import { IndexComponent } from './index/index.component';
import { SignUpComponent } from './index/sign-up/sign-up.component';
import {PageNotFoundComponent} from './index/page-not-found/page-not-found.component';
import { SignInComponent } from './index/sign-in/sign-in.component';
import {TemplatesPageComponent} from './index/templates-page/templates-page.component';
import { AuthGuard } from './_shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./index/index.module')
      .then(m => m.IndexModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
      .then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'store',
    loadChildren: () => import('./store-edit/store-edit.module')
      .then(m => m.StoreEditModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

const templateRoutes: Routes = [
  {
    path: '',
    loadChildren: () => {
      const template = JSON.parse(sessionStorage.getItem('store')).template.name;
      if (template === 'template1') {
        return import('./second-template/second-template.module')
          .then(m => m.SecondTemplateModule);
      }
      else {
        return import('./template/template.module')
          .then(m => m.TemplateModule);
      }
    },
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

const isCurrentDomainWebipie = (window.location.hostname === 'webipie.com');

@NgModule({
  imports: [RouterModule.forRoot(isCurrentDomainWebipie ? routes : templateRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
