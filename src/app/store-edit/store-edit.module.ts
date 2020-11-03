import {NgModule} from '@angular/core';

import {HttpClientModule} from "@angular/common/http";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {StoreEditRoutingModule} from "./store-edit-routing.module";
import { SidenavStoreComponent } from './sidenav-store/sidenav-store.component';
import {StoreEditComponent} from "./store-edit.component";
import { ChangeFontComponent } from './change-font/change-font.component';
import { ChangeColorComponent } from './change-color/change-color.component';
import { ChangeContactComponent } from './change-contact/change-contact.component';
import { ChangeHeaderComponent } from './change-header/change-header.component';
import { ColorPickerComponent } from './change-color/color-picker/color-picker.component';
import { SocialMediaComponent } from './social-media/social-media.component';


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
      SidenavStoreComponent,
      ChangeFontComponent,
      ChangeColorComponent,
      ChangeContactComponent,
      ChangeHeaderComponent,
      ColorPickerComponent,
      SocialMediaComponent,
    ]
})
export class StoreEditModule {
}
