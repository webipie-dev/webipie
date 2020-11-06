import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TemplateRoutingModule} from './template-routing.module';
import { BannerImageComponent } from './banner-image/banner-image.component';
import {TemplateComponent} from './template.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  imports: [
    TemplateRoutingModule,
    HttpClientModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    BannerImageComponent,
    TemplateComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class TemplateModule {
}
