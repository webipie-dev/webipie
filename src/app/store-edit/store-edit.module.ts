import {NgModule} from '@angular/core';

import {HttpClientModule} from "@angular/common/http";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {StoreEditRoutingModule} from "./store-edit-routing.module";
import { SidenavStoreComponent } from './sidenav-store/sidenav-store.component';
import {StoreEditComponent} from "./store-edit.component";

@NgModule({
    imports: [
        StoreEditRoutingModule,
        HttpClientModule,
        Ng2SmartTableModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    declarations: [
      StoreEditComponent,
    SidenavStoreComponent
    ],
})
export class StoreEditModule {
}
