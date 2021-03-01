import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {StoreEditRoutingModule} from './store-edit-routing.module';
import {StoreEditComponent} from './store-edit.component';
import {ChangeFontComponent} from './change-font/change-font.component';
import {ChangeColorComponent} from './change-color/change-color.component';
import {ChangeContactComponent} from './change-contact/change-contact.component';
import {ChangeHeaderComponent} from './change-header/change-header.component';
import {SocialMediaComponent} from './social-media/social-media.component';
import {SidenavMenuComponent} from './sidenav-menu/sidenav-menu.component';
import {TemplateModule} from '../template/template.module';
import {SidebarModule} from 'ng-sidebar';
import {KeysPipe} from '../_shared/utils/KeysPipe';


@NgModule({
  imports: [
    StoreEditRoutingModule,
    HttpClientModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    CommonModule,
    TemplateModule,
    FormsModule,
    SidebarModule
  ],

  declarations: [
    StoreEditComponent,
    ChangeFontComponent,
    ChangeColorComponent,
    ChangeContactComponent,
    ChangeHeaderComponent,
    SocialMediaComponent,
    SidenavMenuComponent,
    KeysPipe
  ]
})
export class StoreEditModule {
}
