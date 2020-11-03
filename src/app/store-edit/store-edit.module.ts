import {NgModule} from '@angular/core';

import {HttpClientModule} from "@angular/common/http";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {StoreEditRoutingModule} from "./store-edit-routing.module";
import {StoreEditComponent} from "./store-edit.component";
import { ChangeFontComponent } from './change-font/change-font.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';


@NgModule({
    imports: [
      StoreEditRoutingModule,
      HttpClientModule,
      Ng2SmartTableModule,
      ReactiveFormsModule,
      CommonModule
    ],
    declarations: [
      StoreEditComponent,
      ChangeFontComponent,
      SocialMediaComponent,
      SidenavMenuComponent,
    ]
})
export class StoreEditModule {
}
