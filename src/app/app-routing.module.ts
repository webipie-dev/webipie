import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
