import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TemplateRoutingModule} from './template-routing.module';


@NgModule({
  imports: [
    TemplateRoutingModule,
    HttpClientModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
  ]
})
export class TemplateModule {
}
