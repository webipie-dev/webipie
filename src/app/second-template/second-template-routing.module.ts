import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SecondTemplateComponent} from "./second-template.component";
import {HomeComponent} from "../template/home/home.component";
import {HomeSecondTemplateComponent} from "./home-second-template/home-second-template.component";
import {ProductsAllSecondTemplateComponent} from "./products-all-second-template/products-all-second-template.component";


const routes: Routes = [{
  path: '',
  component: SecondTemplateComponent,
  children: [
    {
      path: 'home',
      component: HomeSecondTemplateComponent
    },
    {
      path: 'products',
      component: ProductsAllSecondTemplateComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecondTemplateRoutingModule {
}
