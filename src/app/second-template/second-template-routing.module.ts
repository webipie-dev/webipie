import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductsAllSecondTemplateComponent} from './products-all-second-template/products-all-second-template.component';
import {SecondTemplateComponent} from './second-template.component';
import {HomeSecondTemplateComponent} from './home-second-template/home-second-template.component';
import {CartSecondTemplateComponent} from './cart-second-template/cart-second-template.component';
import {CheckoutSecondTemplateComponent} from './checkout-second-template/checkout-second-template.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';



const routes: Routes = [{
  path: '',
  component: SecondTemplateComponent,
  children: [
    {
      path: '',
      component: HomeSecondTemplateComponent,
      // pathMatch: 'full',
    },
    {
      path: 'products',
      component: ProductsAllSecondTemplateComponent
    },
    {
      path: 'cart',
      component: CartSecondTemplateComponent
    },
    {
      path: 'checkout',
      component: CheckoutSecondTemplateComponent
    },
    {
      path: 'product-detail/:id',
      component: ProductDetailComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecondTemplateRoutingModule {
}
