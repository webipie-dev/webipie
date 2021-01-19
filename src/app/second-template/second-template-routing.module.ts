import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SecondTemplateComponent} from './second-template.component';
import {HomeSecondTemplateComponent} from './home-second-template/home-second-template.component';
import {CartSecondTemplateComponent} from './cart-second-template/cart-second-template.component';


const routes: Routes = [{
  path: '',
  component: SecondTemplateComponent,
  children: [
    {
      path: 'home',
      component: HomeSecondTemplateComponent
    },
    {
      path: 'cart',
      component: CartSecondTemplateComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecondTemplateRoutingModule {
}
