import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSecondTemplateComponent } from './header-second-template/header-second-template.component';
import { FooterSecondTemplateComponent } from './footer-second-template/footer-second-template.component';
import { HomeSecondTemplateComponent } from './home-second-template/home-second-template.component';
import {SecondTemplateRoutingModule} from "./second-template-routing.module";
import { TopSliderComponent } from './top-slider/top-slider.component';
import { ProductsSectionSecondTemplateComponent } from './products-section-second-template/products-section-second-template.component';
import { AboutSecondTemplateComponent } from './about-second-template/about-second-template.component';
import { ProductsAllSecondTemplateComponent } from './products-all-second-template/products-all-second-template.component';



@NgModule({
  declarations: [HeaderSecondTemplateComponent, FooterSecondTemplateComponent, HomeSecondTemplateComponent, TopSliderComponent, ProductsSectionSecondTemplateComponent, AboutSecondTemplateComponent, ProductsAllSecondTemplateComponent],
  exports: [
    HeaderSecondTemplateComponent,
    FooterSecondTemplateComponent
  ],
  imports: [
    CommonModule,
    SecondTemplateRoutingModule
  ]
})
export class SecondTemplateModule { }
