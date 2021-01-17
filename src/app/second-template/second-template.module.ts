import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSecondTemplateComponent } from './header-second-template/header-second-template.component';
import { FooterSecondTemplateComponent } from './footer-second-template/footer-second-template.component';
import { HomeSecondTemplateComponent } from './home-second-template/home-second-template.component';
import {SecondTemplateRoutingModule} from "./second-template-routing.module";



@NgModule({
  declarations: [HeaderSecondTemplateComponent, FooterSecondTemplateComponent, HomeSecondTemplateComponent],
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
