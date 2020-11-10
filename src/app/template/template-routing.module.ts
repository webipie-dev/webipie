import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductPageComponent } from './product-page/product-page.component';
import {TemplateComponent} from './template.component';
import {CheckoutPageComponent} from './checkout-page/checkout-page.component';

const routes: Routes = [{
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'product',
        component: ProductPageComponent
      },
      {
        path: 'checkout',
        component: CheckoutPageComponent
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule {
}
