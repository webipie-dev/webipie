import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TemplateRoutingModule} from './template-routing.module';
import { BannerImageComponent } from './banner-image/banner-image.component';
import {TemplateComponent} from './template.component';
import { ProductCardComponent } from './product-card/product-card.component';
import {ChangeImgDirective} from './product-card/change-img.directive';

@NgModule({
  imports: [
    TemplateRoutingModule,
    HttpClientModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    BannerImageComponent,
    TemplateComponent,
    ProductCardComponent,
    ChangeImgDirective
  ]
})
export class TemplateModule {
}
