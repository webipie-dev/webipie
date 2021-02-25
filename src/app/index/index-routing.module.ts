import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {IndexComponent} from "./index.component";
import {TemplatesPageComponent} from "./templates-page/templates-page.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {AfterSigninComponent} from "./after-signin/after-signin.component";

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
    component: AfterSigninComponent,
    // canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {
}
