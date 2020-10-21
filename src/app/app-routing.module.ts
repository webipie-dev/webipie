import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfterSigninComponent } from './index/after-signin/after-signin.component';
import { IndexComponent } from './index/index.component';
import { SignInComponent } from './index/sign-in/sign-in.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
